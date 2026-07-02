class SpeechRecognitionService {
    private recognition: SpeechRecognition | null = null;

    constructor() {
        const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech Recognition is not supported.");
            return;
        }

        this.recognition = new SpeechRecognition();

        this.recognition.lang = "en-US";
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
    }

    startListening(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.recognition) {
                reject("Speech Recognition is not available.");
                return;
            }

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                resolve(transcript);
            };

            this.recognition.onerror = (event) => {
                reject(event.error);
            };

            this.recognition.start();
        });
    }

        stopListening(): void {
            this.recognition?.stop();
        }
}

  const speechRecognitionService = new SpeechRecognitionService();

export default speechRecognitionService;