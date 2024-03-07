import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { filter, finalize, scan, switchMap, tap } from 'rxjs';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { HistoryItem } from '../interfaces/history-item.interface';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-generate-text-multimodal',
  standalone: true,
  imports: [FormsModule, ChatHistoryComponent],
  template: `
    <h3>Input a prompt to receive an answer from Google Gemini AI</h3>
    <div>
      <textarea rows="8" [(ngModel)]="text"></textarea>
      <button (click)="prompt.set(text)" [disabled]="loading()">{{ buttonText() }}</button>
    </div>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenerateTextMultimodalComponent {
  geminiService = inject(GeminiService);
  prompt = signal('');
  loading = signal(false);
  text = '';

  buttonText = computed(() => this.loading() ? 'Processing' : 'Ask me anything');

  chatHistory = toSignal(toObservable(this.prompt)
    .pipe(
      filter((prompt) => prompt !== ''),
      tap(() => this.loading.set(true)),
      switchMap((prompt) => 
        this.geminiService.generateText(prompt).pipe(finalize(() => this.loading.set(false)))
      ),
      scan((acc, response) => acc.concat({ prompt: this.prompt(), response }), [] as HistoryItem[]),
    ), { initialValue: [] as HistoryItem[] });
}
