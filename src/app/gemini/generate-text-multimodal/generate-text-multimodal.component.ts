import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { filter, finalize, map, scan, switchMap, tap } from 'rxjs';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { HistoryItem } from '../interfaces/history-item.interface';
import { GeminiService } from '../services/gemini.service';
import { ImageInfo, MultimodalInquiry } from '../interfaces/genmini.interface';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { PromptBoxComponent } from '../prompt-box/prompt-box.component';

@Component({
  selector: 'app-generate-text-multimodal',
  standalone: true,
  imports: [FormsModule, ChatHistoryComponent, ImagePreviewComponent, PromptBoxComponent],
  template: `
    <h3>Input a prompt and select an image to receive an answer from the Google Gemini AI</h3>
    <div class="container">
      <div>
        <label for="fileInput">Select an image:</label>
        <input id="fileInput" name="fileInput" (change)="fileChange($event)"
          alt="image input" type="file" accept=".jpg,.jpeg,.png" />
      </div>
      <app-image-preview class="image-preview" />
      <div>
        <textarea rows="3" [(ngModel)]="prompt"></textarea>
        <button (click)="askQuestion.set(vm.formData)" [disabled]="vm.isLoading">{{ vm.buttonText }}</button>
      </div>
      <app-prompt-box />
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

    label {
      margin-right: 0.5rem;
    }

    input[type="file"], .image-preview {
      margin-bottom: 0.75rem;
    }

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
  askQuestion = signal<MultimodalInquiry | null>(null);
  imageInfo = signal<ImageInfo>({
    base64DataURL: '',
    base64Data: '',
    mimeType: '',
  })

  viewModel = computed(() => ({
    isLoading: this.loading(),
    buttonText: this.loading() ? 'Processing' : 'Ask me anything',
    formData: {
      base64Data: this.imageInfo().base64Data,
      mimeType: this.imageInfo().mimeType,
      prompt: this.prompt(),
    },
  }));

  get vm() {
    return this.viewModel();
  }

  chatHistory = toSignal(toObservable(this.askQuestion)
    .pipe(
      filter((inquiry) => !!inquiry && inquiry.prompt !== '' && !!inquiry.base64Data),
      tap(() => this.loading.set(true)),
      map((inquiry) => inquiry as MultimodalInquiry),
      switchMap((inquiry) => 
        this.geminiService.generateTextFromMultimodal(inquiry).pipe(finalize(() => this.loading.set(false)))
      ),
      scan((acc, response) => acc.concat({ prompt: this.prompt(), response }), [] as HistoryItem[]),
    ), { initialValue: [] as HistoryItem[] });

  fileChange(event: any) {
    const imageFile: File | undefined = event.target.files?.[0];
    if (!imageFile) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      const fileResult = reader.result;
      if (fileResult && typeof fileResult === 'string') {
        const data = fileResult.substring(`data:${imageFile.type};base64,`.length);
        this.imageInfo.set({
          base64DataURL: fileResult,
          base64Data: data,
          mimeType: imageFile.type
        });
      }
    }
  }
}
