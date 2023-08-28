class Handler {
    static handle(req: any, res: any) {
        const { status, message, data } = req;
        res.status(status).json({
            status,
            message,
            data
        });
    }
}