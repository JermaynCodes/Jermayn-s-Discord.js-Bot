module.exports = 
{
    name: "scomplain",
    run: (client, message, args) => 
    {
        //Wenn der Command nicht in einer DM ist
        if(message.channel.type == "text") return;

        if(!args[0])
        {
            message.channel.send("Wo liegt das Problem? bsp.(!complain Ich finde das die User etwas übertreiben.)");
        }

        let Message = args.slice(0).join(' ');
        try
        {
            message.react('👍')

            message.channel.send("Danke, Die Nachricht wurde direkt an Jermayn weiter geleitet")
            .then(msg => msg.react('✅'));

            return client.users.fetch('316984278678503434').then((user) => {
                user.send("**Scomplain: **" + Message);
            });
            
        }
        catch
        {
            return message.channel.send("Es ist ein Fehler aufgetreten :/")
            .then(msg => msg.react('❌'));
        }
    }
}
