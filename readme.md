<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=discordapilink&fontSize=70&fontAlignY=35&animation=twinkling&fontColor=gradient" /></center>

[![Version][version-github-shield]](version-url)
[![Forks][forks-github-shield]](https://github.com/vishal889/discordapilink/network/members)
[![Stargazers][stars-github-shield]](https://github.com/vishal889/discordapilink/stargazers)
[![Issues][issues-github-shield]](https://github.com/vishal889/discordapilink/issues)
[![MIT License][license-github-shield]](https://github.com/vishal889/discordapilink/blob/master/LICENSE)
[![Discord Support](https://discordapp.com/api/guilds/936226552256036926/widget.png?style=shield)](SupportServer)


[chat-discord=shield]: https://img.shields.io/discord/936226552256036926?style=for-the-badge
[version-github-shield]: https://img.shields.io/github/package-json/v/vishal889/discordapilink?style=for-the-badge
[forks-github-shield]: https://img.shields.io/github/forks/vishal889/discordapilink?style=for-the-badge
[stars-github-shield]: https://img.shields.io/github/stars/vishal889/discordapilink?style=for-the-badge
[issues-github-shield]: https://img.shields.io/github/issues/vishal889/discordapilink?style=for-the-badge
[license-github-shield]: https://img.shields.io/github/license/vishal889/discordapilink?style=for-the-badge



# Discord Api Client 
Managing the interaction between Discord bots and their dashboards can be a complex task, often involving tedious API connections and data synchronization. Enter `discordapilink` – a revolutionary package designed to empower Discord bot developers with effortless dashboard integration.

## Why?

- **Simplified Integration**: Eliminate the need for intricate API connections. discordapilink provides a straightforward way to establish secure communication between your bot and its dashboard.

- **Effortless Data Exchange**: Sending and receiving data between your bot and its dashboard is a breeze. Enjoy a smooth and intuitive process that enhances the overall user experience.

- **Rapid Setup**: With minimal code, you can set up your bot's connection to the dashboard. Spend less time on setup and more time refining your bot's features.

- **Comprehensive Documentation**: Our extensive documentation guides you through every step of the integration process. Whether you're a seasoned developer or just starting, you'll find the resources you need to succeed.

- Don't let dashboard integration slow down your Discord bot's development. Experience the power of discordapilink and revolutionize the way your bot interacts with its dashboard.

## How does it work?
discordapilink uses a packages like `express`, `next` etc.. as engines to form connection to establish a secure, real-time connection between your bot and its dashboard. This connection allows you to send and receive data between your bot and its dashboard with ease.

### See below for guides on how to use discordapilink with your bot.

# Download
```bash
npm i discordapilink
------ or ---------------------
yarn add discordapilink
```

# Setting Up
first of all, you would need to create a build process for sending and receiving data between your bot and its dashboard. **While using Api**

### Building the Server
```js
const { Build } = require('discordapilink');
const i = await new Build() // Start the build process by calling the build class and store it for later use
        i.setApis(["/api1","/api2"]); // you can add as many apis as you want 
        i.setWebsockets(["/ws"]) // you can add as many websockets as you want
        i.setEngine("express"); // Select a engine
        i.setPort(3000) // set a port where u wanna start the server
        i.build() // build the server **!Important** 
```
### Build Options
- `setApis` - set the apis for the server
- `setWebsockets` - set the websockets for the server 
- `setEngine` - set the engine for the server
- `setPort` - set the port for the server
- `build` - build the server
**!Important** - `build` should be called at the end of the build process

**Extra Options** - Should not be used while building the server
- `getApis` - get the apis currently loaded in the server 
- `getWebsockets` - get the websockets currently loaded in the server
- `getlength` - get the length of apis loaded 
- `getlogs` - get the logs of the server runtime Or Error 
- `clearlogs` - clear the logs of the server runtime Or Error

### Sending Data through Api
```js
const { Api } = require('discordapilink');
const a : Api = await new Api();
        const testData = {
            apiName : "api1",
            guild: message.guild?.name,
            channel: message.channel.id,
            user: message.author.id
        } // Example Data<Object>. can be anything
        
    a.setData({test: testData}) // set the data to be sent can be anything
    a.setMessage("This is a test message Check Status 200 OK") // set the message to be sent can be anything
    a.setStatus(200) // set the status code to be sent can be anything but sucess codes are recommended
    a.send("api1"); // send the data to the api
```
### Api Options
- `setData` - set the data to be sent
- `setMessage` - set the message to be sent
- `setStatus` - set the status code to be sent
- `send` - send the data to the api

### Receiving Data through Api
```js
const { Api } = require('discordapilink');
const a : Api = await new Api();
    a.receive("api1") // receive the data from the api where data was sent
```
### Sending Data through Websocket
```js
const { Websocket } = require('discordapilink');
const ws : Websocket = await new Websocket();
        const testData = {
            WebsocketName : "ws",
            guild: message.guild?.name,
            channel: message.channel.id,
            user: message.author.id
        } // Example Data<Object>. can be anything
        
    ws.setData({test: testData}) // set the data to be sent can be anything
    ws.send("/ws"); // send the data to the api or ws.send("ws")
```
### Websocket Options
- `setData` - set the data to be sent
- `send` - send the data to the websocket

### Infomative operations
```js
const { Build } = require('discordapilink');
/**
 * The Build class is used to build the server 
 * Important - Informative options should be used after the build process is completed
 */
//assuming that the build process is completed and is stored in a variable called i
i.getApis() // get the apis currently loaded in the server
i.getWebsockets() // get the websockets currently loaded in the server
i.getlength() // get the length of apis loaded
i.getlogs() // get the logs of the server runtime Or Error
i.clearlogs() // clear the logs of the server runtime Or Error
```

# Examples
- [Basic DiscordBot Example](https://github.com/vishal889/discordapilink/blob/main/Examples/discordbot.js)
