import express from "express";
import cors from "cors";
import routes from "./routes/index";

const app = express();

app.use(cors());
app.use("/api", routes);

const port = Number(process.env.PORT) || 8000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is up on port ${port}.`);
});