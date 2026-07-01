import { Request, Response } from "express";
import { startNewGame } from "../services/gameServices";

export const startGame = (
    req: Request,
    res: Response
): void => {
    const game = startNewGame();

    res.status(200).json(game);
};