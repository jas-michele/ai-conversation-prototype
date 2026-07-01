import openai from "../config/openai";

export const startNewGame = async () => {
    const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: `You are the host of "Who Wants To Be a Millionaire: Developer Edition"

        Generate 5 begineer JavaScript mulitple-choice questions.

        For each question return: 
        -question
        - four answer choices (A, B, C, D)
        - the correct answer letter

        Return JSON in this format:
        {
            "question": "...",
            "choices": {
                "A": "...",
                "B": "...",
                "C": "...",
                "D": "...",
            },
            "correctAnswer": "A"
        }
        `
    })
    
    const rawText = response.output_text;

    const cleanJson = rawText
        .replace(/```json/g, ""
        .replace(/```/g, "")
        .trim()  
        )

    const startIndex = cleanJson.indexOf("[");
    const endIndex = cleanJson.lastIndexOf("]");
    
    const jsonOnly = cleanJson.slice(startIndex, endIndex + 1);

    const questions = JSON.parse(jsonOnly);

    return {
        success: true,
        currentQuestion: 0,
        score: 0,
        questions,
    };
};