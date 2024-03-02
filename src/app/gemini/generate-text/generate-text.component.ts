import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { NEVER, scan, switchMap, tap } from 'rxjs';
import { GeminiService } from '../services/gemini.service';
import { ChatItem } from '../interfaces/chat-history.interface';

@Component({
  selector: 'app-generate-text',
  standalone: true,
  imports: [FormsModule, MarkdownComponent],
  template: `
    <p>Input a prompt to receive an answer from Google Gemini AI</p>
    <div>
      <textarea rows="8" [(ngModel)]="text"></textarea>
      <button (click)="prompt.set(text)">Ask me anything</button>
    </div>
    <!-- <markdown class="markdown" [data]="markdown"></markdown> -->
    @if (chatHistory().length > 0) {
      <ol>
        @for (history of chatHistory(); track history) {
          <li>
            <p>{{ history.prompt }}</p>
            <markdown [data]="history.response" />
            <!-- <p>Response: {{ history.response }}</p> -->
          </li>
        }
      </ol>
    }
  `,
  styles: `
    textarea {
      margin-right: 0.5rem;
      width: 49%;
    }

    p {
      font-size: 1.25rem;
    }

    button {
        padding: 0.65rem;
        border-radius: 8px;
    }

    .markdown {
      margin-top: 1rem;
      margin-right: 1rem;
      width: 50%;
    }

    ol {
      margin: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateTextComponent {
  geminiService = inject(GeminiService);
  prompt = signal('');
  text = '';

  chatHistory = toSignal(toObservable(this.prompt)
    .pipe(
      switchMap((prompt) =>
        prompt !== '' ? this.geminiService.generateText(prompt) : NEVER
      ),
      scan((acc, response) => acc.concat({ prompt: this.prompt(), response }), [] as ChatItem[]),
    ), { initialValue: [] as ChatItem[] });
}
