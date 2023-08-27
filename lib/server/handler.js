class Handler {
    static handle(req, res) {
        const { status, message, data } = req;
        res.status(status).json({
            status,
            message,
            data
        });
    }
}
//# sourceMappingURL=handler.js.map