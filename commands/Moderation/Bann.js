const { MessageEmbed, Client, ClientUser } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const { Console } = require("console");

module.exports = 
{
    name: "bann",
    category: "moderation",
    aliases: ["ban"],
    description: "Bannt ein User!",
    usage: "<id | mention>",
    run: async (client, message, args) => 
    {
    //Wenn die nachricht in einer DM ist
    if(message.channel.type == "dm") return;

        if (message.deletable) message.delete();

        const toBan = message.mentions.members.first()

        //User hat keine Rechte
        if (!message.member.hasPermission("BAN_MEMBERS")) 
        {
            message.react('🤦')
            return;
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) 
        {
            return message.reply("❌ Ich habe keine Rechte.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        //Kein Grund
        if(!args[1])
        {
            return message.reply("Du weist ja, Ohne Grund wird nimand gebannt.")
            .then(msg =>
                {
                    msg.delete({timeout: 5000})
                })
        }

        let Grund = args.slice(1).join(' ');

        if (toBan.id == "316984278678503434")
        {
            message.reply("Jermayn kann nicht gebannt werden!")
            .then(msg =>
                {
                    msg.delete({timeout: 5000})
                })
        }

        //Test ob User gebannt werden kann.
        if (!toBan.bannable) 
        {
            return message.reply(":crown: Der User ist zu mächtig. Er kann warscheinlich nicht auf Grund der rollenhirachie gebannt werden.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        // Kein User
        if (!toBan) 
        {
            return message.reply(":thinking: Ich finde den User nicht.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        // Mann kann sich nicht selbst bannen
        if (toBan.id === message.author.id) 
        {
            return message.reply(":person_facepalming::joy: Du kannst dich nicht selbst bannen.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        //Bannt den User
        toBan.ban({reson: Grund});

        const logchannel = message.guild.channels.cache.get("743792264542683147")

        var d = new Date();
        const Zeit = d.toLocaleTimeString()
        const Datum = d.toLocaleDateString()

        const embed = new MessageEmbed() //Log Embed wird erstellt.
            .setColor("RED")
            .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
            .setTimestamp()
            .setThumbnail('https://i.dlpng.com/static/png/6417750_preview.png')
            .setTitle('Bann Befehl')
            .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
            .setDescription(stripIndents`**BANN INFO**`)
            .addFields(
                { name: '**Gebannter User**', value: "**Name:** __" +  toBan.displayName + "__ \n**ID:** __" + toBan.id + "__ "},
                { name: '**Gebannt von**', value:  "**Name:** __" + message.member.displayName + "__" + "\n**ID:** __" + message.member.id + "__" },
                { name: '**Mehr Infos**', value:  "**Grund:** __" + Grund + "__" + "\n**Channel Name:** __" + message.channel.name + "__" + "\n**Channel ID:** __" + message.channel.id + "__" + "\n**Datum:** __" + Datum + "__" + "\n**Uhrzeit:** __" + Zeit + "__"},
            );


        logchannel.send(embed)
    }
};