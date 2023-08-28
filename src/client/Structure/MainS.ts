import express, { Application } from "express";
import { Utils } from "../../server/utils.js";

class Build {
    public engine: "default" | "express";
    public app: Application | null = null;
    public apis: string[] = [];
    public logs: string[] = [];
    public port : number = null;

    constructor() {
        this.engine = null;
        this.apis = [];
        this.logs = [];
    }

    /**
     * @param engine The engine to be used
     * @description Set the engine to be used
     */
    public setEngine(engine: "default" | "express"): this {
        this.engine = engine;
        return this;
    }

    /**
     * @param port The port to set
     * @description Set the port to be used
     */
    public setPort(port: number): this {
        this.port = port;
        return this;
    }


    /**
     * @returns The engine being used
     */
    public getEngine() {
        return this.engine;
    }

    /**
     * @param apis The API routes to set
     */
    public setApis(apis: string[]): this {
        this.apis = apis;
        return this;
    }

    /**
     * @returns The API routes being used
     */
    public getApis(SpecificApi?: string) : string[] | null {
        if (SpecificApi) {
            return this.apis.filter((a) => a === SpecificApi);
        } else {
            if (this.apis.length === 0 || !this.apis) {
                return null;
            } else {
                return this.apis;
            }
        }
    }

    /**
     * @returns The length of the API routes being used ? or the length of a specific API route
     * @param SpecificApi The specific API route to get the length of
     * @description Get the length of the API routes being used
    */
     
    public getlength(SpecificApi?: string) {
        if (SpecificApi) {
            return this.apis.filter((a) => a === SpecificApi).length;
        } else {
            if (this.apis.length === 0 || !this.apis) {
                return 0;
            } else {
                return this.apis.length;
            }
        }
    }

    /**
     * @returns The logs
     * @description Get the logs
     */
    public getlogs(){
        return this.logs;
    }

    /**
     * @description Clear the logs
     * @returns void
     */
    public clearlogs(){
        this.logs = [];
    }
    /**
     * @description build the server
     * @returns {Promise<void>}
     */
    public async build(): Promise<this> {
        if (!this.engine) {
            this.setEngine("express");
        }
        if(!this.port){
            throw new Error("No Port Specified");
        }
        
        await Utils.Ubuild(this,this.engine);
        
        return this;
    }
    

}

export default Build;

