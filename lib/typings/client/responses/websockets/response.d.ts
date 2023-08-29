declare class Websocket {
    private static _instance;
    private xInstance;
    private websocketManager;
    data: any;
    constructor();
    setData(data: any): Promise<this>;
    send(websocketName: string): Promise<void>;
    receive(websocketName: string): Promise<any>;
}
export default Websocket;
