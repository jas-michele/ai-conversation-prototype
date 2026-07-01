import { use, useState } from "react";
import { startGame } from "../services/gameService";
import type { GameSession } from "../types/game";

function GamePage() {
    const [game, setGame] = useState<GameSession | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleStartGame = async () => {
        try {
            setLoading(true);
            setError("");

            const gameSession = await startGame();
            setGame(gameSession);
        } catch (err) {
            setError("Failed to start game.");
        } finally {
            setLoading(false);
        }
    };

    if (!game) {
        return (
            <div>
                <h1>Who Wants To Be a Millionare</h1>
                <h2>Developer Edition</h2>

                <button onClick={handleStartGame} disabled={loading}>
                    {loading ? "Starting..." : "Start Game"}
                </button>

                {error && <p>{error}</p>}
            </div>
        );
    }

    const question = game.questions[game.currentQuestion];

    return (
        <div>
            <h2> Question {game.currentQuestion + 1}</h2>

            <p>{question.question}</p>

            <p>A. {question.choices.A}</p>
            <p>B. {question.choices.B}</p>
            <p>C. {question.choices.C}</p>
            <p>D. {question.choices.D}</p>
        </div>
    );
}

export default GamePage;