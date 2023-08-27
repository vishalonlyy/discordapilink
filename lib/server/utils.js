import Build from "../client/Structure/MainS.js";
import express from "express";
export class Utils {
    static xInstance = null;
    static getXInstance() {
        if (!this.xInstance) {
            this.xInstance = new Build();
        }
        return this.xInstance;
    }
    /**
     * @param specifcEngine @optional The engine to be used
     * @description Build the server
     * @returns {Promise<void>}
     */
    static async Ubuild(xInstance, specifcEngine) {
        this.xInstance = xInstance;
        let E = xInstance.getEngine();
        if (E === null || E === undefined) {
            xInstance.setEngine("express");
            E = xInstance.getEngine();
        }
        if (specifcEngine === "express" || specifcEngine === "default") {
            xInstance.setEngine(specifcEngine);
            const a = await this.BuildExpressApp(xInstance);
            xInstance.app = a;
            if (!xInstance.port)
                throw new Error("No Port Specified");
            if (xInstance.port) {
                xInstance.app.listen(xInstance.port, () => {
                    xInstance.logs.push("[Build] Server started on port " + xInstance.port);
                    //throw new warn("[Build] Server started on port "+xInstance.port);
                });
            }
        }
    }
    /**
     * @description Build the express app
     * @returns {Promise<express.Application>} The express app
     */
    static BuildExpressApp(b) {
        const app = express();
        this.xInstance.app = app;
        const routes = b.getApis();
        routes.forEach((route) => {
            b.logs.push("[Build] Adding API route: " + route);
            app.get(route, (req, res) => {
                res.json({ message: `Hello from ${route} API route` });
            });
        });
        b.logs.push("[Build] Express app with API routes built");
        return app;
    }
    /**
     *@description Send Api Data on to specific Api
     *@param Api @required The Api to send data to
     *@param status @required The status of the response
     *@param message @required The message of the response
     *@param data @required The data of the response
     */
    static async sendApiData(Api, status, message, data) {
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
    static async receiveApiData(Api) {
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
}
//# sourceMappingURL=utils.js.map