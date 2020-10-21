module.exports = 
{
    name: "verify",
    run: (client, message, args) => 
    {
        //Wenn die nachricht in einer DM ist
        if(message.channel.type == "dm") return;
 
        if (message.deletable) message.delete();

        if(message.channel.id != "746426481470734507") return;

        if(args[0] == "Darling")
        {
            const role = message.guild.roles.cache.find(role => role.id === '746424795851128873');

            message.member.roles.add(role);
        }

        if(args[0] == "darling")
        {
            const role = message.guild.roles.cache.find(role => role.id === '746424795851128873');

            message.member.roles.add(role);
        }
    }
}
