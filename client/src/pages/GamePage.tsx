import { use, useState } from "react";
import { startGame } from "../services/gameService";
import type { GameSession } from "../types/game";

function GamePage() {
    const [game, setGame] = useState<GameSession | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [result, setResult] = useState("");

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

    const handleSubmitAnswer = () => {
        if (!selectedAnswer) return;

        if (selectedAnswer === question.correctAnswer) {
            setResult("✅ Correct");
        } else {
            setResult("❌ Incorrect");
        }
    }

    return (
        <div>
            <h2> Question {game.currentQuestion + 1}</h2>

            <p>{question.question}</p>

           <button onClick={() => setSelectedAnswer("A")}>
            A. {question.choices.A}
           </button>
           <button onClick={() => setSelectedAnswer("B")}>
            B. {question.choices.B}
           </button>
           <button onClick={() => setSelectedAnswer("C")}>
            C. {question.choices.C}
           </button>
           <button onClick={() => setSelectedAnswer("D")}>
            D. {question.choices.D}
           </button>

           <p>Selected Answer: {selectedAnswer}</p>

           <button onClick={handleSubmitAnswer}>
                Submit Answer
           </button>

           {result && <h3>{result}</h3>}
        </div>
    );
}

export default GamePage;