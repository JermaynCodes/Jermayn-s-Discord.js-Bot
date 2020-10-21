module.exports = 
{
    name: "complain",
    run: (client, message, args) => 
    {
        //Wenn der Command nicht in einer DM ist
        if(message.channel.type == "text") return;

        if(!args[0])
        {
            message.channel.send("Wo liegt das Problem? bsp.(!complain Ich finde das die User etwas übertreiben.)")
        }

        let Message = args.slice(0).join(' ');

        try
        {
            message.react('👍')

            message.channel.send("Danke, dein Anliegen wird an den Teammitgliedern weitergeleitet.")
            .then(msg => msg.react('✅'));

            var server = client.guilds.cache.get("744236790281535598").channels.cache.get("746416226980331530");

            return server.send(Message);
        }
        catch
        {
            return message.channel.send("Es ist ein Fehler aufgetreten :/")
            .then(msg => msg.react('❌'));
        }
    }
}
