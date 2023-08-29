import { Utils } from "../../../server/utils.js";
class Websocket {
    static _instance = null;
    xInstance;
    websocketManager = null;
    data = null;
    constructor() {
        if (Websocket._instance) {
            return Websocket._instance;
        }
        Websocket._instance = this;
        this.websocketManager = Utils.getWebsocketManager();
        this.xInstance = Utils.getXInstance();
    }
    async setData(data) {
        this.data = data;
        return this;
    }
    async send(websocketName) {
        this.xInstance = Utils.getXInstance();
        if (!websocketName) {
            this.xInstance?.logs.push("[Error-Send] No websocketName Provided cannot receive data to null websocketName");
            throw new Error("No websocketName Provided cannot send data to null websocketName");
        }
        if (!websocketName.includes("/")) {
            websocketName = "/" + websocketName;
        }
        let a = this.xInstance.getWebsockets(websocketName);
        const websocketslength = this.xInstance.getWebsockets().length;
        if (a.length === 0 || !a) {
            this.xInstance?.logs.push("[Error-Send] No websocketName Provided cannot receive data to null websocketName");
            throw new Error("No websocketName Provided cannot send data to null websocketName");
        }
        if (a.length > 1) {
            this.xInstance?.logs.push("[Error-Send] Multiple websockets found with the same name");
            throw new Error("Multiple websockets found with the same name");
        }
        let message = "wss data";
        Utils.sendWebsocketData('/ws', 200, message, this.data);
    }
    async receive(websocketName) {
        this.xInstance = Utils.getXInstance();
        if (!websocketName) {
            this.xInstance?.logs.push("[Error-Receive] No websocketName Provided cannot receive data to null websocketName");
            throw new Error("No websocketName Provided cannot receive data to null websocketName");
        }
        if (!websocketName.includes("/")) {
            websocketName = "/" + websocketName;
        }
        let a = this.xInstance.getWebsockets(websocketName);
        const websocketslength = this.xInstance.getWebsockets().length;
        if (a.length === 0 || !a) {
            this.xInstance?.logs.push("[Error-Receive] No websocketName Provided cannot receive data to null websocketName");
            throw new Error("No websocketName Provided cannot receive data to null websocketName");
        }
        if (a.length > 1) {
            this.xInstance?.logs.push("[Error-Receive] Multiple websockets found with the same name");
            throw new Error("Multiple websockets found with the same name");
        }
        let message = "wss data";
        Utils.receiveWebsocketData('/ws');
    }
}
export default Websocket;
//# sourceMappingURL=response.js.map