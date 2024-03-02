import { HARM_CATEGORY } from '../enums/harm-category.enum';
import { THRESHOLD } from '../enums/threshold.enum'

export interface GeminiConfig {
    maxOutputTokens: number,
    temperature: number,
    topP: number,
    topK: number
};

export interface GeminiSafetySetting {
    category: HARM_CATEGORY,
    threshold: THRESHOLD
}
