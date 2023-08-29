/// <reference types="node" />
import { Application } from "express";
import WebSocket from "ws";
import http from "http";
declare class Build {
    engine: "default" | "express";
    app: Application | null;
    apis: string[];
    logs: string[];
    port: number;
    server: http.Server;
    websockets: string[];
    wssmanager: WebSocket.Server;
    wssBulit: any;
    constructor();
    /**
     * @param engine The engine to be used
     * @description Set the engine to be used
     */
    setEngine(engine: "default" | "express"): this;
    /**
     * @param port The port to set
     * @description Set the port to be used
     */
    setPort(port: number): this;
    /**
     * @returns The engine being used
     */
    getEngine(): "default" | "express";
    /**
     * @param apis The API routes to set
     */
    setApis(apis: string[]): this;
    /**
     * @param websockets The websockets to set
     * @description Set the websockets to be used
     * @returns this
     */
    setWebsockets(websockets: any[]): this;
    /**
     * @returns The API routes being used
     */
    getApis(SpecificApi?: string): string[] | null;
    /**
     * @returns The websockets being used
     * @param SpecificWebsocket The specific websocket to get
     * @description Get the websockets being used
     * @returns this
     */
    getWebsockets(SpecificWebsocket?: string): string[] | null;
    /**
     * @returns The length of the API routes being used ? or the length of a specific API route
     * @param SpecificApi The specific API route to get the length of
     * @description Get the length of the API routes being used
    */
    getlength(SpecificApi?: string): number;
    /**
     * @returns The logs
     * @description Get the logs
     */
    getlogs(): string[];
    /**
     * @description Clear the logs
     * @returns void
     */
    clearlogs(): void;
    /**
     * @description build the server
     * @returns {Promise<void>}
     */
    build(): Promise<this>;
}
export default Build;
