export interface Question {
    question: string;
    choices: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: string
}

export interface GameSession {
    success: boolean;
    currentQuestion: number;
    score: number;
    questions: Question[];
}