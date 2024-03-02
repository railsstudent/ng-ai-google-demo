import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideMarkdown } from 'ngx-markdown';
import { AppComponent } from './app/app.component';
import { provideGeminiApi } from './app/gemini/gemini.provider';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideGeminiApi(),
    provideMarkdown()
  ]
})
  .catch(err => console.error(err));
