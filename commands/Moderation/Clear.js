module.exports = 
{
    name: "clear",
    //aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Cleart den Chat",
    run: async (client, message, args) => 
    {
        //Wenn die nachricht in einer DM ist
        if(message.channel.type == "dm") return;
        
        //User hat keine Rechte
        if (!message.member.hasPermission("MANAGE_MESSAGES")) 
        {
            message.react('🤦')
            return;
        }

        if (message.deletable) message.delete();

        // Bot hat keine Rechte
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) 
        {
            return message.reply("❌ Ich habe keine Rechte.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        // Check ist args[0] eine Zahl
        if (isNaN(args[0])) 
        {
            return message.reply("Ich brauche eine Anzahl wie viele Nachrichten ich Löschen soll")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        //Wenn 0 Nachrichten sind
        if (parseInt(args[0]) <= 0) 
        {
            return message.reply("Ich kann nich **0** Nachrichten Löschen.")
            .then(msg => 
                {
                    msg.delete({ timeout: 5000 })
                })
        }

        let deleteAmount;

        if (parseInt(args[0]) >= 99) 
        {
            deleteAmount = 100;
        } 
        else 
        {
            deleteAmount = parseInt(args[0]);
        }

        return message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => {message.channel.send(`Ich habe \`${deleted.size}\` Nachrichten Gelöscht.`).then(msg => {msg.delete({ timeout: 5000 })})})
            .catch(err => {return});
    }
}