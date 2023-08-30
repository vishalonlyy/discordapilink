declare class Websocket {
    private static _instance;
    private xInstance;
    private websocketManager;
    data: any;
    constructor();
    /**
     * @param data data to be sent
     * @returns Websocket instance
     * @description Set the data to be sent
     * @returns {Promise<this>}
     */
    setData(data: any): Promise<this>;
    /**
     * @param websocketName websocketName to be sent
     * @description Send data / response to specific websocket Built
     * @returns {Promise<void>}
     */
    send(websocketName: string): Promise<void>;
}
export default Websocket;
