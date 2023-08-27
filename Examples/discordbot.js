import { Client, Events, GatewayIntentBits } from 'discord.js';
import { Build, Api } from 'discordwebclient';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
let i = null;
//let a : Api|null = null;
client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}---${c.user.id}`);
    if (i === null) {
        i = await new Build();
        i.setApis(["/test", "/t"]);
        i.setEngine("express");
        i.setPort(3000);
        i.build();
    }
    // if(a===null){
    //     a = await new Api();
    // }
});
client.on("messageCreate", async (message) => {
    if (message.content === "logs") {
        const logs = i?.getlogs();
        const arrayMessage = [];
        for (const log of logs || []) {
            arrayMessage.push(log);
        }
        message.reply({ content: arrayMessage.join("\n") });
        console.log(logs);
    }
    if (message.content === "apis") {
        const apis = i?.getApis() || [];
        const arrayMessage = [];
        for (const api of apis) {
            arrayMessage.push(api);
        }
        message.reply({ content: arrayMessage.join("\n") });
    }
    if (message.content.startsWith("send")) {
        const args = message.content.split(" ");
        console.log(args);
        console.log("Sending to :" + args[1]);
        const a = await new Api();
        const testData = {
            api: args[1],
            guild: message.guild?.name,
            channel: message.channel.id,
            user: message.author.id
        };
        a.setData({ test: testData });
        a.setMessage("This is a test message Check Status 200 OK");
        a.setStatus(200);
        a.send(args[1]);
        message.reply("sent");
    }
    if (message.content.startsWith("receive")) {
        const a = await new Api();
        const args = message.content.split(" ");
        console.log(args);
        console.log("Receiving from :" + args[1]);
        a.receive(args[1]);
        message.reply("received");
    }
    if (message.content === "clear") {
        i?.clearlogs();
        message.reply("Logs have been cleared");
    }
});
client.login('Your Token Here');