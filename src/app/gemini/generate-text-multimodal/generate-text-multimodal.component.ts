import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, filter, finalize, scan, switchMap, tap } from 'rxjs';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { ImageInfo } from '../interfaces/genmini.interface';
import { HistoryItem } from '../interfaces/history-item.interface';
import { PromptBoxComponent } from '../prompt-box/prompt-box.component';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-generate-text-multimodal',
  standalone: true,
  imports: [FormsModule, ChatHistoryComponent, ImagePreviewComponent, PromptBoxComponent],
  template: `
    <h3>Input a prompt and select an image to receive an answer from the Google Gemini AI</h3>
    <div class="container">
      <app-image-preview class="image-preview" (imageChange)="imageInfo.set($event)" />
      <app-prompt-box  [loading]="loading()" [(prompt)]="prompt" (sendPrompt)="isClicked$.next()" />
    </div>
    <app-chat-history [chatHistory]="chatHistory()" />
  `,
  styles: `    
    h3 {
      margin-bottom: 1rem;
    }

    div.container {
      display: flex;
      flex-direction: column;
    }

    .image-preview {
      margin-bottom: 0.75rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenerateTextMultimodalComponent {
  geminiService = inject(GeminiService);
  prompt = signal('');
  loading = signal(false);
  imageInfo = signal<ImageInfo>({
    base64DataURL: '',
    base64Data: '',
    mimeType: '',
  });

  askQuestion = computed(() => {
    return {
      base64Data: this.imageInfo().base64Data,
      mimeType: this.imageInfo().mimeType,
      prompt: this.prompt(),   
    }
  })

  viewModel = computed(() => ({
    isLoading: this.loading(),
    askQuestion: this.askQuestion(),
  }));

  isClicked$ = new Subject<void>();

  get vm() {
    return this.viewModel();
  }

  chatHistory = toSignal(this.isClicked$
    .pipe(
      filter(() => this.askQuestion().prompt !== '' && !!this.askQuestion().base64Data),
      tap(() => this.loading.set(true)),
      switchMap((inquiry) => 
        this.geminiService.generateTextFromMultimodal(this.askQuestion())
          .pipe(finalize(() => this.loading.set(false)))
      ),
      scan((acc, response) => acc.concat({ prompt: this.prompt(), response }), [] as HistoryItem[]),
    ), { initialValue: [] as HistoryItem[] });
}
