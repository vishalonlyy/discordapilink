import { Utils } from "../../../server/utils.js";
class Api {
    xInstance;
    status;
    message;
    data;
    static _instance = null;
    constructor() {
        if (Api._instance) {
            return Api._instance; // Return existing instance if available
        }
        Api._instance = this;
        this.xInstance = Utils.getXInstance();
        this.status = 200;
        this.message = "";
        this.data = null;
    }
    /**
     *
     * @param status status code to be sent
     * @returns Api instance
     */
    setStatus(status) {
        this.status = status;
        return this;
    }
    /**
     * @param message message to be sent
     * @returns Api instance
     */
    setMessage(message) {
        this.message = message;
        return this;
    }
    /**
     * @param data data to be sent
     * @returns Api instance
     */
    setData(data) {
        this.data = data;
        return this;
    }
    /**
     * @param Api Api to be sent
     * @description Send data / response to specific Api Built
     */
    send(Api) {
        this.xInstance = Utils.getXInstance();
        if (!Api) {
            this.xInstance?.logs.push("[Error-Send] No Api Provided cannot receive data to null Api");
            throw new Error("No Api Provided cannot send data to null Api");
        }
        if (!Api.includes("/")) {
            Api = "/" + Api;
        }
        let a = this.xInstance.getApis(Api);
        const ApiLength = this.xInstance.getlength(Api);
        if (a === null || !a || a.length === 0) {
            throw new Error("No Api Found with the name ::" + Api);
        }
        if (ApiLength > 1) {
            throw new Error("Multiple Apis Found with the name ::" + Api);
        }
        Utils.sendApiData(Api, this.status, this.message, this.data).then(() => {
            this.xInstance?.logs.push("[Send] Sending Response");
            this.xInstance?.logs.push(JSON.stringify({ status: this.status, message: this.message, data: this.data }, null, 2));
        });
    }
    /**
     * @param Api Api to be received
     * @description Receive data / response from specific Api Built
     * @returns {Promise<void>}
     */
    receive(Api) {
        this.xInstance = Utils.getXInstance();
        if (!Api) {
            this.xInstance?.logs.push("[Error-Receive] No Api Provided cannot receive data from null Api");
            throw new Error("No Api Provided cannot receive data from null Api");
        }
        if (!Api.includes("/")) {
            Api = "/" + Api;
        }
        let a = this.xInstance.getApis(Api);
        const ApiLength = this.xInstance.getlength(Api);
        if (a === null || !a || a.length === 0) {
            throw new Error("No Api Found with the name ::" + Api);
        }
        if (ApiLength > 1) {
            throw new Error("Multiple Apis Found with the name ::" + Api);
        }
        Utils.receiveApiData(Api).then(() => {
            this.xInstance?.logs.push("[Receive] Receiving Response");
            this.xInstance?.logs.push(JSON.stringify({ status: this.status, message: this.message, data: this.data }, null, 2));
        });
        return Promise.resolve();
    }
}
export default Api;
//# sourceMappingURL=response.js.map