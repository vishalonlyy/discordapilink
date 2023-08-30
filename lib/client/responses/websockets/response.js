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
    /**
     * @param data data to be sent
     * @returns Websocket instance
     * @description Set the data to be sent
     * @returns {Promise<this>}
     */
    async setData(data) {
        this.data = data;
        return this;
    }
    /**
     * @param websocketName websocketName to be sent
     * @description Send data / response to specific websocket Built
     * @returns {Promise<void>}
     */
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
        Utils.sendWebsocketData(websocketName, 200, message, this.data);
    }
}
export default Websocket;
//# sourceMappingURL=response.js.map