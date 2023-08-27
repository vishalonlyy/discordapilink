import Build from "../client/Structure/MainS";
import express from "express";
const x = new Build();
export class Utils {
    static xInstance = x;
    /**
     * @param specifcEngine @optional The engine to be used
     * @description Build the server
     * @returns {Promise<void>}
     */
    static async Ubuild(specifcEngine) {
        let E = this.xInstance.getEngine();
        if (E === null || E === undefined) {
            this.xInstance.setEngine("express");
            E = this.xInstance.getEngine();
        }
        if (E === "express") {
            const a = await this.BuildExpressApp();
            this.xInstance.app = a;
            this.xInstance.app.listen(3000, () => {
                this.xInstance.logs.push("[Build] Server started on port 3000");
            });
        }
        if (specifcEngine === "express" || specifcEngine === "default") {
            this.xInstance.setEngine(specifcEngine);
            const a = await this.BuildExpressApp();
            this.xInstance.app = a;
            this.xInstance.app.listen(3000, () => {
                this.xInstance.logs.push("[Build] Server started on port 3000");
            });
        }
    }
    /**
     * @description Build the express app
     * @returns {Promise<express.Application>} The express app
     */
    static BuildExpressApp() {
        this.xInstance.app = express();
        const app = express();
        return app;
    }
}
//# sourceMappingURL=build.js.map