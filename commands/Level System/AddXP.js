let xp = require("../../xp.json");

module.exports = 
{
    name: "addxp",
    category: "Level System",
    description: "Fügt ein User XP auf einer Heiligen weise hinzu.",
    run: (client, message, args) => 
    {
        //Wenn die nachricht in einer DM ist
        if(message.channel.type == "dm") return;

        //Reacten mit Facepalm wenn der User keine rechte hat
        if (!message.member.hasPermission("ADMINISTRATOR")) 
        {
            return message.react('🤦');
        }

        //Löscht die Command eingabe
        if (message.deletable) message.delete();

        //Überprüft ob ein user gemarkt wurde
        if(!args[0])
        {
            return message.channel.send('Wer?')
                    .then(msg => msg.delete({timeout:10000}));
        }

        //Nimmt den User aus den ersten argument
        const User = message.mentions.members.first();

        //Überprüft ob der User ein User ist LOL
        if(!User)
        {
            return message.channel.send('**' + args[0] + '** ist kein User')
                    .then(msg => msg.delete({timeout:10000}));
        }

        //Überprüft ob args[1] leer ist
        if(!args[1])
        {
            return message.channel.send("Wieviel XP?")
                    .then(msg => msg.delete({timeout:10000}));
        }

        //Überprüft ob args[1] eine Zahl ist
        if(isNaN(args[1]))
        { 
            return message.channel.send('**' + args[1] + '** ist keine Zahl')
                    .then(msg => msg.delete({timeout:10000}));
        }

        //Zur Vereinfachung 
        let x = args[1];
        var Adden = parseInt(x);
        let curxp = xp[User.id].xp;
        let nxtLvlXp = 750 * (Math.pow(1.45, xp[User.id].level - 1))

        try
        {
            //Fügt XP zum User hinzu
            xp[User.id].xp = curxp + Adden;
            
            //Antwortet was geändert wurde
            return message.channel.send("**" + User.displayName + "** wurden **" + Adden + " XP** hinzugefügt")
                    .then(msg => msg.delete({timeout:10000}));
        }
        catch (e)
        {
            console.log(e)
            return message.channel.send("Ein fehler :/ ist aufgetreten versuche es erneut");
        }
    }
}
