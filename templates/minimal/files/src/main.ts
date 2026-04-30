import { createServer } from "xypriss";

const app = createServer();

app.get("/", (req, res) => {
    res.json({ message: "XyPriss Minimal" });
});

app.start();
