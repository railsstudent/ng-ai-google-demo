import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';
import { provideGeminiApi } from './gemini/gemini.provider';

export const appConfig = {
    providers: [
      provideHttpClient(),
      provideRouter(routes),
      provideGeminiApi(),
      provideMarkdown()
    ]
  };
  