import { Request, Response } from "express";

export const startGame = (
    req: Request,
    res: Response
): void => {
    res.status(200).json({
        success: true,
        questionNumber: 1,
        score: 0,
        question: "What keyword declares a constant in JavaScript"
    });
};