
import Build from "../client/Structure/MainS.js";
import express, { Application } from "express";
import WebSocket from "ws";
import http from "http";
import expressWs from "express-ws";

export class Utils {

    private static xInstance: Build | null = null;
    private static websocketManager: WebSocket.Server = null;
    public static getXInstance(): Build {
        if (!this.xInstance) {
            this.xInstance = new Build();
        }
        return this.xInstance;
    }

    /**
     * 
     * @returns The websocket manager
     * @description Get the websocket manager
     */
    public static getWebsocketManager(): WebSocket.Server {
        if (!this.websocketManager) {
            const server = this.xInstance?.server;
            this.websocketManager = new WebSocket.Server({ server });
            this.websocketManager.on('connection', (socket, req) => {
                socket.on('message', (message) => {
                    this.xInstance?.logs.push("[Receive] Received Data from Websocket");
                    if (Buffer.isBuffer(message)) {
                      const receivedString = message.toString('utf8'); // Adjust encoding if needed
                      this.xInstance?.logs.push("[Receive] Received Buffer data from websocket :" + receivedString);
                    } else if (typeof message === 'string') {
                      try {
                        const jsonData = JSON.parse(message);
                        this.xInstance?.logs.push("[Receive] Received JSON data from websocket :" + JSON.stringify(jsonData, null, 2));
                      } catch (error) {
                        this.xInstance?.logs.push("[Receive] Received String data from websocket :" + message);
                      }
                    }
                  });
                socket.on("close", () => {
                    this.xInstance?.logs.push("[Close] Connection Closed");
                }
                );
                socket.on("error", (err: string) => {
                    this.xInstance?.logs.push("[Error] Error Occured");
                    this.xInstance?.logs.push(err);
                });
            });
        }
        return this.websocketManager;
    }

    /**
     * @param specifcEngine @optional The engine to be used
     * @description Build the server
     * @returns {Promise<void>}
     */
    static async Ubuild(xInstance: Build, specifcEngine?: "express" | "default",): Promise<void> {
        this.xInstance = xInstance;
        let E: string = xInstance.getEngine();
        if (E === null || E === undefined) {
            xInstance.setEngine("express");
            E = xInstance.getEngine();
        }
        if (specifcEngine === "express" || specifcEngine === "default") {
            xInstance.setEngine(specifcEngine);
            const a = await this.BuildExpressApp(xInstance);
            xInstance.app = a;
            const server = http.createServer(a);
            let x = server.address();
            xInstance.server = server;
            if (!xInstance.port) throw new Error("No Port Specified");
            if (xInstance.port) {
                server.listen(xInstance.port, () => {
                    xInstance.logs.push("[Build] Server started on port " + xInstance.port);
                })
            }
        }
    }


    /**
     * @description Build the express app
     * @returns {Promise<express.Application>} The express app
     */
    private static BuildExpressApp(b: Build): Application {
        const app = express();

        this.xInstance.app = app;
        const routes = b.getApis();
        const websockets = b.getWebsockets(b.server as http.Server | any);
        if (routes.length === 0 || !routes) {
            b.logs.push("[Build] No API routes found");
        }
        if (websockets.length === 0 || !websockets) {
            b.logs.push("[Build] No Websocket routes found");
        }
        websockets.forEach((route) => {
            b.logs.push("[Build] Adding Websocket route: " + route);
            app.get(route, (req, res) => {
                res.json({ message: `Hello from ${route} Websocket route` });
            });
        });

        routes.forEach((route) => {
            b.logs.push("[Build] Adding API route: " + route);
            app.get(route, (req, res) => {
                res.json({ message: `Hello from ${route} API route` });
            });
        });
        if (websockets && routes) b.logs.push("[Build] Express app with API and Websocket routes built");
        else if (websockets && !routes) b.logs.push("[Build] Express app with Websocket routes built");
        else if (!websockets && routes) b.logs.push("[Build] Express app with API routes built");

        return app;
    }

    /**
     *@description Send Api Data on to specific Api
     *@param Api @required The Api to send data to
     *@param status @required The status of the response
     *@param message @required The message of the response
     *@param data @required The data of the response
     */
    public static async sendApiData(Api: string, status: number, message: string, data: any): Promise<void> {
        if (!Api.includes("/")) {
            Api = "/" + Api;
        }
        const app = this.xInstance?.app;
        const routes = this.xInstance?.getApis(Api);
        if (routes === null || !routes || routes.length === 0) {
            throw new Error("No Api Found with the name ::" + Api);
        }
        if (routes.length > 1) {
            throw new Error("Multiple Apis Found with the name ::" + Api);
        }
        app.get(Api, (req, res) => {
            res.status(status).json({
                status: status,
                message: message,
                data: data
            });
        });
    }
    /**
     * @param Api @required The Api to receive data from
     * @description Receive Api Data from specific Api
     * @returns {Promise<void>}
     * 
     */
    public static async receiveApiData(Api: string): Promise<void> {
        if (!Api.includes("/")) {
            Api = "/" + Api;
        }
        const app = this.xInstance?.app;
        const routes = this.xInstance?.getApis(Api);
        if (routes === null || !routes || routes.length === 0) {
            throw new Error("No Api Found with the name ::" + Api);
        }
        if (routes.length > 1) {
            throw new Error("Multiple Apis Found with the name ::" + Api);
        }


        app.post(Api, (req, res) => {
            const receivedData = req.body;
            const responseData = { message: 'Data received and processed successfully', data: receivedData };
            res.status(200).json(responseData);
            this.xInstance?.logs.push("[Receive] Received Data");
            this.xInstance?.logs.push(JSON.stringify(receivedData, null, 2));
        });
    }


    /**
     * @param Websocket @required The Websocket to receive data from
     * @description Receive Websocket Data from specific Websocket
     * @returns {Promise<void>}
     */
    public static async sendWebsocketData(Websocket: any, status: number, message: string, data: any): Promise<void> {
        const websocketServer: WebSocket.Server = this.getWebsocketManager();
        if (websocketServer) {
            const websocketUrl = `ws://localhost:${this.xInstance?.port}${Websocket}`
            const socket = new WebSocket(websocketUrl);
            socket.addEventListener('open', () => {
                this.xInstance?.logs.push("[Send] Sending Response to " + websocketUrl);
                if(data instanceof Object){
                    socket.send(JSON.stringify(data));
                }else{
                    socket.send(data);
                }
            });
            socket.addEventListener('message', (event) => {
                this.xInstance?.logs.push("[Receive] Received Data-");
                if(event.data instanceof Object){
                    this.xInstance?.logs.push(JSON.stringify(event.data, null, 2));
                }else{
                    this.xInstance?.logs.push(event.data);
                }
            });
        }
    }


}