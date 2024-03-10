import { Route } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./gemini/generate-text/generate-text.component')
            .then((m) => m.GenerateTextComponent)
    },
    {
        path: 'text-multimodal',
        loadComponent: () => import('./gemini/generate-text-multimodal/generate-text-multimodal.component')
            .then((m) => m.GenerateTextMultimodalComponent)
    },
    {
        path: '**',
        redirectTo: '',
    }
];