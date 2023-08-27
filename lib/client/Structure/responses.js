import express from "express";
import Build from "./MainS";
const x = new Build();
export class Response {
    status;
    message;
    data;
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
    async Send(res, Api) {
        let a = x.getApis(Api);
        const ApiLength = x.getlength(Api);
        if (a === null || !a || a.length === 0) {
            throw new Error("No Api Found with the name ::" + Api);
        }
        if (ApiLength > 1) {
            throw new Error("Multiple Apis Found with the name ::" + Api);
        }
        const routeFile = (await import(`../../server/handlers/response.js`)).default;
        x.app.use(a, routeFile);
        const express_ = express.Router();
        res.status(this.status).json({
            status: this.status,
            message: this.message,
            data: this.data
        });
    }
    /**
     * @returns status The status to set
     */
    getStatus() {
        return this.status;
    }
    /**
     * @returns message The message to set
     */
    getMessage() {
        return this.message;
    }
    /**
     * @returns data The data to set
     */
    getData() {
        return this.data;
    }
}
//# sourceMappingURL=responses.js.map