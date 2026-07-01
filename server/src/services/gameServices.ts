import openai from "../config/openai";

export const startNewGame = async () => {
    const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: "Create one easy JavaScript trivia question. Return only the question."
    })

    return {
        success: true,
        questionNumber: 1,
        score: 0,
        question: response.output_text,
    };
};