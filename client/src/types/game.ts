export interface Question {
    question: string;
    choices: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnser: string
}

export interface GameSession {
    success: boolean;
    currentQuestion: number;
    score: number;
    questions: Question[];
}