import { EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { CORE_GUARD, GEMINI_API_KEY, GEMINI_PRO_URL, GEMINI_PRO_VISION_URL } from './core.constant';

export function provideGeminiApi(): EnvironmentProviders {
    const genAIBase = 'https://generativelanguage.googleapis.com/v1beta/models';

    return makeEnvironmentProviders([
        {
            provide: GEMINI_API_KEY,
            useValue: '<api key>',
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