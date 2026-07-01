import axios from "axios";
import type { GameSession }  from "../types/game";

const API_URL = "http://localhost:5001/api/game";

export const startGame = async (): Promise<GameSession> => {
    const response = await axios.post<GameSession>(
        `${API_URL}/start`
    );

    return response.data
}