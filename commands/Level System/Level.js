const {MessageEmbed} = require("discord.js");

let xp = require("../../xp.json");

module.exports = 
{
    name: "level",
    //aliases: ["array", "of", "aliases"],
    //category: "Category name",
    //description: "command beschreibung",
    //usage: "[args input]",
    run: (client, message, args) => 
    {
        //Wenn die nachricht in einer DM ist
        if(message.channel.type == "dm") return;
           
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvlXp = 750 * (Math.pow(1.45, xp[message.author.id].level - 1))
        let difference = nxtLvlXp - curxp;

        const lvlembed = new MessageEmbed()
        .setAuthor(message.author.username)
        .setColor("RED")
        .addField("Level", curlvl, true)
        .addField("XP", curxp, true)
        .setFooter(difference + ' XP zum nechsten Level', message.author.displayAvatarURL);

        message.channel.send(lvlembed)
            .then(msg => msg.delete({ timeout: 20000 }))
    }
}