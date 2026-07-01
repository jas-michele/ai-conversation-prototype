import { use, useState } from "react";
import { startGame } from "../services/gameService";
import type { GameSession } from "../types/game";

function GamePage() {
    const [game, setGame] = useState<GameSession | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [result, setResult] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

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

    if (currentQuestion >= game.questions.length) {
        return (
            <div>
                <h1>Game Over!</h1>
                <h2>Final Score: {score}</h2>
            </div>
        )
    }

    const question = game.questions[currentQuestion];

    const handleSubmitAnswer = () => {
        if (!selectedAnswer) return;

        if (selectedAnswer === question.correctAnswer) {
            setScore((prev) => prev + 1);
            setResult("✅ Correct");
        } else {
            setResult("❌ Incorrect");
        }
    }

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setResult("");
    }

    return (
        <div>
            <h3>Score: {score}</h3>

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

           <button 
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer || !!result}
           >
                Submit Answer
           </button>

           {result && ( 
            <>
            <h3>{result}</h3>

            <button onClick={handleNextQuestion}>
                Next Question
            </button>
            </>
           )}
        </div>
    );
}

export default GamePage;