let xp = require("../../xp.json");

module.exports = 
{
    name: "toggle",
    category: "Category name",
    description: "command beschreibung",
    usage: "[args input]",
    run: (client, message, args) => 
    {
        //Wenn die nachricht in einer DM ist
        if(message.channel.type == "dm") return;

        //Löscht die Command eingabe
        if (message.deletable) message.delete();

        //Überprüft ob die erste eingabe leer ist
        if(!args[0])
        {
            return message.reply("Was möchtest du Toggel?")
        }

        let xpstatus = xp[message.author.id].status

        if(args[0].toLowerCase() == "lvl") //Level System
        {
            if(xpstatus == 0 )
            {
                xp[message.author.id].status = 1;
                return message.reply("Das **Level System** wurde für dich **deaktiviert**")
                .then(msg => msg.delete({timeout:15000}));
            }
            else if(xpstatus == 1)
            {
                xp[message.author.id].status = 0;
                return message.reply("Das **Level System** wurde für dich wieder **aktiviert**")
                .then(msg => msg.delete({timeout:15000}));
            }
        }
        else if(args[0].toLowerCase() == "level") //Level System
        {
            if(xpstatus == 0 )
            {
                xp[message.author.id].status = 1;
                return message.reply("Das **Level System** wurde für dich **deaktiviert**")
                .then(msg => msg.delete({timeout:15000}));
            }
            else if(xpstatus == 1)
            {
                xp[message.author.id].status = 0;
                return message.reply("Das **Level System** wurde für dich wieder **aktiviert**")
                .then(msg => msg.delete({timeout:15000}));
            }
        }
        else if(args[0].toLowerCase() == "xp") //Level System
        {
            if(xpstatus == 0 )
            {
                xp[message.author.id].status = 1;
                return message.reply("Das **Level System** wurde für dich **deaktiviert**")
                .then(msg => msg.delete({timeout:15000}));
            }
            else if(xpstatus == 1)
            {
                xp[message.author.id].status = 0;
                return message.reply("Das **Level System** wurde für dich wieder **aktiviert**")
                .then(msg => msg.delete({timeout:15000}));
            }
        }
        else
        {
            return message.reply("**" + args[0] + "** Kann man nicht togglen")
            .then(msg => msg.delete({timeout:15000}));
        }

    }
}
