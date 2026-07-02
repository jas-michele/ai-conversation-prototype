interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;

    start(): void;
    stop(): void;
    abort(): void;

    onstart: (() => void) | null;
    onend: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null; 
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null; 
}

interface SpeechRecognitionConstructor {
    new(): SpeechRecognition;
}

interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
}