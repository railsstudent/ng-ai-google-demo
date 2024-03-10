import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, filter, finalize, scan, switchMap, tap } from 'rxjs';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { HistoryItem } from '../interfaces/history-item.interface';
import { PromptBoxComponent } from '../prompt-box/prompt-box.component';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-generate-text',
  standalone: true,
  imports: [FormsModule, ChatHistoryComponent, PromptBoxComponent],
  template: `
    <h3>Input a prompt to receive an answer from the Google Gemini AI</h3>
    <app-prompt-box [loading]="loading()" [(prompt)]="prompt" (askMe)="isClicked$.next()" />
    <app-chat-history [chatHistory]="chatHistory()" />
  `,
  styles: `
    textarea {
      margin-right: 0.5rem;
      width: 49%;
      font-size: 1rem;
      padding: 0.75rem;
      border-radius: 4px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateTextComponent {
  geminiService = inject(GeminiService);
  prompt = signal('');
  loading = signal(false);

  isClicked$ = new Subject<void>();

  chatHistory = toSignal(this.isClicked$
    .pipe(
      filter(() => this.prompt() !== ''),
      tap(() => this.loading.set(true)),
      switchMap((prompt) => 
        this.geminiService.generateText(this.prompt()).pipe(finalize(() => this.loading.set(false)))
      ),
      scan((acc, response) => acc.concat({ prompt: this.prompt(), response }), [] as HistoryItem[]),
    ), { initialValue: [] as HistoryItem[] });
}
