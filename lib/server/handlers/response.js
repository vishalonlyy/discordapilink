// routes/guilds.js
import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    const guildsData = [];
    res.json({ guilds: guildsData });
});
export default router;
//# sourceMappingURL=response.js.map