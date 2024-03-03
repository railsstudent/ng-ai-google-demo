import { provideHttpClient } from '@angular/common/http';
import { Route, provideRouter, withComponentInputBinding } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { provideGeminiApi } from './gemini/gemini.provider';
import { GenerateTextComponent } from './gemini/generate-text/generate-text.component';

const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./gemini/generate-text/generate-text.component')
            .then((m) => m.GenerateTextComponent)
    },
    {
        path: '**',
        redirectTo: '',
    }
];

export const appConfig = {
    providers: [
      provideHttpClient(),
      provideRouter(routes, withComponentInputBinding()),
      provideGeminiApi(),
      provideMarkdown()
    ]
  };
  