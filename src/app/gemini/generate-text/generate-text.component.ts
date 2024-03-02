import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { NEVER, scan, switchMap } from 'rxjs';
import { ChatItem } from '../interfaces/chat-history.interface';
import { GeminiService } from '../services/gemini.service';
import { LineBreakPipe } from '../pipes/line-break.pipe';

@Component({
  selector: 'app-generate-text',
  standalone: true,
  imports: [FormsModule, MarkdownComponent, LineBreakPipe],
  template: `
    <h3>Input a prompt to receive an answer from Google Gemini AI</h3>
    <div>
      <textarea rows="8" [(ngModel)]="text"></textarea>
      <button (click)="prompt.set(text)">Ask me anything</button>
    </div>
    <h3>Chat History</h3>
    @if (chatHistory().length > 0) {
      <ol>
        @for (history of chatHistory(); track history) {
          <li>
            <p>{{ history.prompt }}</p>
            <markdown [data]="lineBreakPipe.transform(history.response)" />
          </li>
        }
      </ol>
    } @else {
      <p>No history</p>
    }
  `,
  styles: `
    textarea {
      margin-right: 0.5rem;
      width: 49%;
      font-size: 1rem;
      padding: 0.75rem;
      border-radius: 4px;
    }

    p {
      font-size: 1.25rem;
    }

    button {
        padding: 0.65rem;
        border-radius: 8px;
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
  lineBreakPipe = new LineBreakPipe();

  chatHistory = toSignal(toObservable(this.prompt)
    .pipe(
      switchMap((prompt) =>
        prompt !== '' ? this.geminiService.generateText(prompt) : NEVER
      ),
      scan((acc, response) => acc.concat({ prompt: this.prompt(), response }), [] as ChatItem[]),
    ), { initialValue: [] as ChatItem[] });
}
