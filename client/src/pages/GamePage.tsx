import { useEffect, useState } from "react";
import { startGame } from "../services/gameService";
import type { GameSession } from "../types/game";
import { generateSpeech } from "../services/speechService";
import speechRecognitionService from "../services/speechRecogntitionService";

function GamePage() {
    const [game, setGame] = useState<GameSession | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [result, setResult] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const [transcript, setTranscript] = useState("");

    useEffect(() => {
        if (!game) return;

        const speakQuestion = async () => {
            const question = game.questions[currentQuestion];

            const text = `
               Question ${currentQuestion + 1}.

               ${question.question}

               A. ${question.choices.A}
               B. ${question.choices.B}
               C. ${question.choices.C}
               D. ${question.choices.D}
            `;

            try {
                const audioUrl = await generateSpeech(text);

                const audio = new Audio(audioUrl);

                await audio.play();
            } catch (error) {
                console.error(error);
            }
        }

        speakQuestion();
    }, [game, currentQuestion]);

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
            <div className="game-container">
                <h1 className="title">Who Wants To Be a Millionaire</h1>
                <h2 className="subtitle">Developer Edition</h2>

                <button className="start-btn" onClick={handleStartGame} disabled={loading}>
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
        const correctLetter = question.correctAnswer;

        const correctText =
            question.choices[correctLetter as keyof typeof question.choices];

        if (!selectedAnswer) return;

        if (selectedAnswer === question.correctAnswer) {
            setScore((prev) => prev + 1);
            setResult("✅ Correct");
        } else {
            setResult(`❌ Incorrect!\n\nThe correct answer was ${correctLetter}. ${correctText}`);
        }
    }

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setResult("");
    }

    const handleListen = async () => {
        try {
            const result = await speechRecognitionService.startListening();

            console.log(result);

            setTranscript(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3 className="score">Score: {score}</h3>

            <h2 className="question"> Question {game.currentQuestion + 1}</h2>

            <p className="question">{question.question}</p>

            <div className="answers">
                <button onClick={handleListen}>
                    🎤 Listen
                </button>

                <p>Transcript: {transcript}</p>

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
            </div>

            <p>Selected Answer: {selectedAnswer}</p>

            <button
                className="submit-btn"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer || !!result}
            >
                Submit Answer
            </button>

            {result && (
                <>
                    <h3 className="result">{result}</h3>

                    <button className="next-btn" onClick={handleNextQuestion}>
                        Next Question
                    </button>
                </>
            )}
        </div>
    );
}

export default GamePage;