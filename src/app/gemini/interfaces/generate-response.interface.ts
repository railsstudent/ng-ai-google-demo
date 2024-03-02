export interface GeminiResponse {
    candidates: {
        content?: {
            parts?: { text: string }[],
            role?: 'user' | 'model'
        }
    }[]
};
