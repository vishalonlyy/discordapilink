import { Utils } from "../../server/build";
class Build {
    engine;
    app = null;
    apis = [];
    logs = [];
    constructor() {
        this.engine = null;
        this.apis = [];
        this.logs = [];
    }
    /**
     * @param engine The engine to be used
     * @description Set the engine to be used
     */
    setEngine(engine) {
        this.engine = engine;
        return this;
    }
    /**
     * @returns The engine being used
     */
    getEngine() {
        return this.engine;
    }
    /**
     * @param apis The API routes to set
     */
    setApis(apis) {
        this.apis = apis;
        return this;
    }
    /**
     * @returns The API routes being used
     */
    getApis(SpecificApi) {
        if (SpecificApi) {
            return this.apis.filter((a) => a === SpecificApi);
        }
        else {
            if (this.apis.length === 0 || !this.apis) {
                return null;
            }
            else {
                return this.apis;
            }
        }
    }
    /**
     * @returns The length of the API routes being used ? or the length of a specific API route
     * @param SpecificApi The specific API route to get the length of
     * @description Get the length of the API routes being used
    */
    getlength(SpecificApi) {
        if (SpecificApi) {
            return this.apis.filter((a) => a === SpecificApi).length;
        }
        else {
            if (this.apis.length === 0 || !this.apis) {
                return 0;
            }
            else {
                return this.apis.length;
            }
        }
    }
    /**
     * @returns The logs
     * @description Get the logs
     */
    getlogs() {
        return this.logs;
    }
    /**
     * @description build the server
     * @returns {Promise<void>}
     */
    async build() {
        if (!this.engine) {
            this.setEngine("express");
        }
        await Utils.Ubuild(this.engine); // Pass 'this' instance
        return this; // Return the instance of the class
    }
}
export default Build;
//# sourceMappingURL=MainS.js.map