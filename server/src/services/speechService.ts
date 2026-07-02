import OpenAI from "openai";
import openai from "../config/openai";
import test from "node:test";

export const generateSpeech = async (
    text: string
): Promise<Buffer<ArrayBufferLike>> => {
    const response = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: text,
    });

    const audioBuffer = Buffer.from(await response.arrayBuffer());

    return audioBuffer;
}