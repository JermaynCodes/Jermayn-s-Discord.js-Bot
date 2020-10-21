const { MessageEmbed, Client, ClientUser } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = 
{
    name: "kick",
    category: "moderation",
    description: "Kickt ein User!",
    usage: "<id | mention>",
    run: async (client, message, args) => 
    {
        //Wenn die nachricht in einer DM ist
        if(message.channel.type == "dm") return;
        
        //User hat keine Rechte
        if (!message.member.hasPermission("KICK_MEMBERS")) 
        {
            message.react('🤦')
            return;
        }

        if (message.deletable) message.delete();

        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) 
        {
            return message.reply("❌ Ich habe keine Rechte.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        const toKick = message.mentions.members.first()

        // Can't kick urself
        if (toKick.id === message.author.id) 
        {
            return message.reply(":person_facepalming::joy: Du kannst dich nicht selbst kicken.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        //Wenn Jermayn versucht gebannt zu werden
        if (toKick.id == "316984278678503434")
        {
            return message.reply("**Jermayn** Kann nicht gekickt werden!!!")
            .then(msg => 
                {
                    msg.delete({ timeout: 10000 })
                })
        }

        // No member found
        if (!toKick) 
        {
            return message.reply(":thinking: Ich finde den User nicht.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }
        // Check if the user's kickable
        if (!toKick.kickable) 
        {
            return message.reply(":crown: Der User ist zu mächtig. Er kann warscheinlich nicht auf Grund der rollenhirachie gekickt werden.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        //Kein Grund
        if(!args[1])
        {
            return message.reply("Du weist ja, Ohne Grund wird nimand gekickt.")
            .then(msg =>
                {
                    msg.delete({timeout: 5000})
                })
        }

        let Grund = args.slice(1).join(' ');

        toKick.kick({reson: Grund}); //Kickt den User

        var d = new Date();
        const Zeit = d.toLocaleTimeString()
        const Datum = d.toLocaleDateString()

        const embed = new MessageEmbed() //Log Embed wird erstellt.
            .setColor("BLUE")
            .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
            .setTimestamp()
            .setThumbnail('https://image.flaticon.com/icons/png/512/1/1928.png')
            .setTitle('Kick Befehle')
            .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
            .setDescription(stripIndents`**KICK INFO**`)
            .addFields(
                { name: '**Gekickter User**', value: "**Name:** __" +  toKick.displayName + "__ \n**ID:** __" + toKick.id + "__ "},
                { name: '**Gekickt von**', value:  "**Name:** __" + message.member.displayName + "__" + "\n**ID:** __" + message.member.id + "__" },
                { name: '**Mehr Infos**', value:  "**Grund:** __" + Grund + "__" + "\n**Channel Name:** __" + message.channel.name + "__" + "\n**Channel ID:** __" + message.channel.id + "__" + "\n**Datum:** __" + Datum + "__" + "\n**Uhrzeit:** __" + Zeit + "__"},
            );

            const logchannel = message.guild.channels.cache.get("743792264542683147")
            
            logchannel.send(embed); //Log Embed wird gesendete.
            return;
    }
};