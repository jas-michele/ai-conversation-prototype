import { Request, Response } from "express";
import { generateSpeech } from "../services/speechService";

export const speak = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { text } = req.body;

        if (!text) {
            res.status(400).json({
                success: false,
                message: "Text is required.",
            });
            return;
        }

        const audioBuffer = await generateSpeech(text);

        res.setHeader("Content-Type", "audio/mpeg");
        res.send(audioBuffer);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate speech."
        });
    }
};