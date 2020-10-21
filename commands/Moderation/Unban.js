const { MessageEmbed, Client, ClientUser, Message } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const { Console } = require("console");

module.exports = 
{
    name: "unban",
    category: "moderation",
    aliases: ["unbann"],
    description: "Entbannt ein User :)",
    usage: "<id | mention>",
    run: async (client, message, args) => 
    {
        //Wenn die nachricht in einer DM ist
        if(message.channel.type == "dm") return;
        
        //User hat keine Rechte
        if (!message.member.hasPermission("BAN_MEMBERS")) 
        {
            message.react('🤦')
            return;
        }

        //Löscht den Command Text
        if (message.deletable) message.delete();

        //Guckt ob der Befehl in den Staff channel ist
        if (message.channel.id != process.env.STAFFCOMMANDS) return;

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) 
        {
            return message.reply("❌ Ich habe keine Rechte.")
            .then(msg => 
                {
                    msg.delete({ timeout: 10000 })
                })
        }

        if (!args[0])
        {
            return message.reply("Keine User ID...")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        if(isNaN(args[0]))
        {
            return message.reply("Keine Zahlen! Eine ID hat nur Zahlen.")
            .then(msg => 
                {
                    msg.delete({ timeout: 6000 })
                })
        }

        if(!args[1])
        {
            return message.reply("Wiso wird der User entbannt?")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        const EntbannGrund = args.slice(1).join(' ');

        let GebannterUser;

        try
        {
            GebannterUser = await client.users.fetch(args[0])
        }
        catch(e)
        {
            if(!GebannterUser) return message.reply("Keine Gültige User ID.")
            .then(msg => 
                {
                    msg.delete({ timeout: 6000 })
                })
        }

        const BannINFOS = await message.guild.fetchBan(args[0]);

        const EntBannVerify = new MessageEmbed()
            .setColor("GREEN")
            //.setFooter(message.member.displayName, message.member.user.displayAvatarURL())
            .setTimestamp()
            .setThumbnail('https://www.mistforums.com/custom/category-icons/unlock.png')
            .setTitle('Die Überprüfung ist nach 30s ungültig.')
            //.setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
            .setDescription(stripIndents`Möchtest du __` + BannINFOS.user.username + `__ Entbannen?` + `\n \n**ENTBANN INFO**`)
            .addFields({ name: '**Gebannter User**', value: "**Name:** __" +  BannINFOS.user.username + "__ \n**ID:** __" + BannINFOS.user.id + "__ \n" + "**Bann Grund:** __" + BannINFOS.reason + "__"})

            await message.channel.send(EntBannVerify).then(async msg => 
                {
                // Reaction manager/controler
                const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
    
                //verifizierung
                if (emoji === "✅") 
                {
                    msg.delete();

                    message.guild.members.unban(GebannterUser, {reason: EntbannGrund})
                        .catch(err => 
                        {
                            if (err) return message.channel.send(`Ein Fehler ist aufgetreten. Error: ${err}`)
                        });

                        var d = new Date();
                    const Zeit = d.toLocaleTimeString()
                    const Datum = d.toLocaleDateString()

                    const embed = new MessageEmbed() //Log Embed wird erstellt.
                        .setColor("#05836C")
                        .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
                        .setTimestamp()
                        .setThumbnail('https://www.mistforums.com/custom/category-icons/unlock.png')
                        .setTitle('Entbann Befehl')
                        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
                        .setDescription(stripIndents`**ENTBANN INFO**`)
                        .addFields(
                                { name: '**Gebannter User**', value: "**Name:** __" +  BannINFOS.user.username + "__ \n**ID:** __" + BannINFOS.user.id + "__ \n" + "**Bann Grund:** __" + BannINFOS.reason + "__"},
                                { name: '**Entbannt Von**', value: '**Name:** __' + message.member.displayName + '__ \n**ID:** __' + message.member.id + '__ \n'},
                                { name: '**Mehr Infos**', value: '**Entbann Grund:** __' + EntbannGrund + '__ \n' + "**Datum:** __" + Datum + "__ \n" + "**Uhrzeit:** __" + Zeit + "__ \n"})

                    logChannel.send(embed)

                    return;
    
                } 
                else if (emoji === "❌") 
                {
                    msg.delete();
                     return message.reply(`Abgebrochen.`)
                     .then(msg => 
                        {
                            msg.delete({ timeout: 10000 })
                        })
                }

                msg.delete();

                return message.reply("Verifizierung abgelaufen")
                .then(msg => 
                    {
                        msg.delete({ timeout: 10000 })
                    })
            });
    }
}