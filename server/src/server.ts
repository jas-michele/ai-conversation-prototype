import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import gameRoutes from "./routes/gameRoutes";
import speechRoutes from "./routes/speechRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/game", gameRoutes);

app.use("/api/game", speechRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "AI conversation Prototype Server Running"
    });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});