import { EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { CORE_GUARD } from '../core/core.constant';
import { GEMINI_API_KEY, GEMINI_GENERATION_CONFIG, GEMINI_PRO_URL, GEMINI_PRO_VISION_URL, GEMINI_SAFETY_SETTINGS } from './gemini.constant';
import { HARM_CATEGORY } from './enums/harm-category.enum';
import { THRESHOLD } from './enums/threshold.enum';

export function provideGeminiApi(): EnvironmentProviders {
    const genAIBase = 'https://generativelanguage.googleapis.com/v1beta/models';

    return makeEnvironmentProviders([
        {
            provide: GEMINI_API_KEY,
            useValue: '<api key>',
        },
        {
            provide: GEMINI_GENERATION_CONFIG,
            useValue: {
                "maxOutputTokens": 1024,
                "temperature": 0.5,
                "topP": 0.5,
                "topK": 3
            },
        },
        {
            provide: GEMINI_SAFETY_SETTINGS,
            useValue: [
                {
                    "category": HARM_CATEGORY.HARM_CATEGORY_HATE_SPEECH,
                    "threshold": THRESHOLD.BLOCK_MEDIUM_AND_ABOVE
                },
                {
                    "category": HARM_CATEGORY.HARM_CATEGORY_DANGEROUS_CONTENT,
                    "threshold": THRESHOLD.BLOCK_MEDIUM_AND_ABOVE
                },
                {
                    "category": HARM_CATEGORY.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    "threshold": THRESHOLD.BLOCK_MEDIUM_AND_ABOVE
                },
                {
                    "category": HARM_CATEGORY.HARM_CATEGORY_HARASSMENT,
                    "threshold": THRESHOLD.BLOCK_MEDIUM_AND_ABOVE
                }
            ],
        },
        {
            provide: GEMINI_PRO_URL,
            useFactory: () => {
                const coreGuard = inject(CORE_GUARD, { self: true, optional: true });
                if (coreGuard) {
                    throw new TypeError('provideGeminiApi cannot load more than once');
                }

                const apiKey = inject(GEMINI_API_KEY);
                return `${genAIBase}/models/gemini-pro:generateContent?key=${apiKey}`;
            }
        },
        {
            provide: GEMINI_PRO_VISION_URL,
            useFactory: () => {
                const apiKey = inject(GEMINI_API_KEY);
                return `${genAIBase}/models/gemini-pro:gemini-pro-vision?key=${apiKey}`;
            }
        },
    ]);
}