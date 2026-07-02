import axios from "axios";

const API_URL = "http://localhost:5001/api/game";

export const generateSpeech = async (
    text: string
): Promise<string> => {
    const response = await axios.post(
        `${API_URL}/speak`,
        { text },
        {
            responseType: "blob",
        }
    );

    const audioUrl = URL.createObjectURL(response.data);

    return audioUrl;
}