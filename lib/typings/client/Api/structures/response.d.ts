declare class Api {
    private xInstance;
    private status;
    private message;
    private data;
    private static _instance;
    constructor();
    /**
     *
     * @param status status code to be sent
     * @returns Api instance
     */
    setStatus(status: number): Api;
    /**
     * @param message message to be sent
     * @returns Api instance
     */
    setMessage(message: string): Api;
    /**
     * @param data data to be sent
     * @returns Api instance
     */
    setData(data: any): Api;
    /**
     * @param Api Api to be sent
     * @description Send data / response to specific Api Built
     */
    send(Api: string): void;
    /**
     * @param Api Api to be received
     * @description Receive data / response from specific Api Built
     * @returns {Promise<void>}
     */
    receive(Api: string): Promise<void>;
}
export default Api;
