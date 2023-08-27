import Build from "../client/Structure/MainS.js";
export declare class Utils {
    private static xInstance;
    static getXInstance(): Build;
    /**
     * @param specifcEngine @optional The engine to be used
     * @description Build the server
     * @returns {Promise<void>}
     */
    static Ubuild(xInstance: Build, specifcEngine?: "express" | "default"): Promise<void>;
    /**
     * @description Build the express app
     * @returns {Promise<express.Application>} The express app
     */
    private static BuildExpressApp;
    /**
     *@description Send Api Data on to specific Api
     *@param Api @required The Api to send data to
     *@param status @required The status of the response
     *@param message @required The message of the response
     *@param data @required The data of the response
     */
    static sendApiData(Api: string, status: number, message: string, data: any): Promise<void>;
    /**
     * @param Api @required The Api to receive data from
     * @description Receive Api Data from specific Api
     * @returns {Promise<void>}
     *
     */
    static receiveApiData(Api: string): Promise<void>;
}
