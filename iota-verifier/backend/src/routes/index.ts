import express, { Request, Response } from "express";
import { verify } from "./api/verify";
import { getVerifiedRequest } from "../type";

const routes = express.Router();

routes.get("/verify", async (req: Request, res: Response): Promise<void> => {
    console.log("Verifying...")
    const { presentationFile, challenge } = req.query as getVerifiedRequest || { presentationFile: "", challenge: ""};
    const response = await verify(presentationFile, challenge);

    res.send({
        verified: response ? response : "",
    });
});

export default routes;