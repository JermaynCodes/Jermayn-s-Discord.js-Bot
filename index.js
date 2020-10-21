const { Client, Collection, MessageAttachment, MessageEmbed, Message } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
let xp = require("./xp.json");
const Canvas = require('canvas');

const client = new Client(
    {
        disableEveryone: true
    });

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config(
    {
    path: __dirname + "/.env"
    });

["command"].forEach(handler => 
    {
    require(`./handlers/${handler}`)(client);
    });

client.on("ready", () => 
{
    console.log(`Hi, ${client.user.username} ist jetzt Online!`);

        client.user.setPresence({ activity: { name: 'twitch.tv/jermayn_'}, status: 'online' }) 
        .then(console.log)
        .catch(console.error);
});

client.on("message", async message =>
{
    const prefix = "!";

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    try
    {
        if (!message.member) message.member = await message.guild.fetchMember(message);
    }
    catch
    {

    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

//Wenn jmd den server joint
client.on("guildMemberAdd", async member => 
{
    //DM Nachricht
    member.send(" ", {files: ["./welcomedm.png"]})
        .then(msg => 
            {
            member.send(" ", {files: ["./divider1.gif"]})
                .then(msg => 
                {
                member.send(":cherry_blossom:  **Willkommen " +  member.displayName + " auf Jermayn's Community Discord Server** :cherry_blossom: \n\nUm alle Channels zu sehen must du dich noch verifizieren.\nDas geht ganz einfach inden du mir den Befehl **!verify Darling** in **#verifizierung** sendest.\n\nFalls es Probleme geben sollte schreib ein Teammitglied oder Jermayn per DM an.\n\n:cherry_blossom:  ansonsten wünsche ich dir **viel Spaß** auf **Jermayn Community Discord Server** :cherry_blossom:");
                })
            });

    const channel = member.guild.channels.cache.get("746435412456636526");

    const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./welcomecanvas.jpg');
    
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px bebas-neue';
	ctx.fillStyle = '#000000';
	ctx.fillText('Willkommen auf den Server,', canvas.width / 2.5, canvas.height / 3.5);

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
    
        let fontSize = 70;
    
        do 
        {
            ctx.font = `${fontSize -= 10}px bebas-neue`;
        } 
        while (ctx.measureText(text).width > canvas.width - 300);
    
        return ctx.font;
    };

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#000000';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Willkommen auf den Server, ${member}!`, attachment);
});

// Wenn ein User den Server leavt
client.on("guildMemberRemove", (member) => 
{
    return;
});

// LEVEL SYSTEM
client.on('message', message =>  
{
    //Bricht ab wenn der Bot der Author ist.
    if(message.author.bot) return;

    //Stoppt wen es ein Command ist
    var msgcontent = message.content;
    if(msgcontent.charAt(0) == "!") return;

    //Fügt XP hinzu (Rechnung)
    let xpAdd = Math.floor(Math.random() * 7) + 8;

    //gen. json eintrag für den User
    if(!xp[message.author.id])
    {
        xp[message.author.id] = 
        {
            xp: 0,
            level: 1,
            status: 0,
        };
    }

    //Stoppt wenn der User das system deaktiviert hat
    if(xp[message.author.id].status == 1) return;

    //Vereinfachugn
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level
    let nxtLvl = 750 * (Math.pow(1.6, xp[message.author.id].level - 1))
    xp[message.author.id].xp = curxp + xpAdd;

    //Level Up message
    if(nxtLvl <= xp[message.author.id].xp)
    {
        xp[message.author.id].level = curlvl + 1;
        let lvlup = new MessageEmbed()
        .setTitle("Level Up!")
        .setColor("RED")
        .addField("Neues Level" , curlvl + 1);

        message.channel.send(lvlup)
        .then(msg =>{msg.delete(5000)});
    }

    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => 
        { if(err) console.log(err)});
});

client.login(process.env.TOKEN);
