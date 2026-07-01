import { Request, Response } from "express";
import { startNewGame } from "../services/gameServices";

export const startGame = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
     const game = await startNewGame();

     res.status(200).json(game);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to start game."
        })
    }
};