import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

export function setTitle() {
    const title = inject(Title);
    title.setTitle('Ng Gemini API Demo');
}
