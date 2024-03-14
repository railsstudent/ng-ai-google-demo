import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, filter, finalize, scan, startWith, switchMap, tap } from 'rxjs';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { ImageInfo, MultimodalInquiry } from '../interfaces/genmini.interface';
import { HistoryItem } from '../interfaces/history-item.interface';
import { PromptBoxComponent } from '../prompt-box/prompt-box.component';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-generate-text-multimodal',
  standalone: true,
  imports: [
    FormsModule, 
    ChatHistoryComponent, 
    ImagePreviewComponent, 
    PromptBoxComponent, 
    AsyncPipe
  ],
  template: `
    <h3>Input a prompt and select an image to receive an answer from the Google Gemini AI</h3>
    <div class="container">
      <app-image-preview class="image-preview" [(imageInfo)]="imageInfo" />
      <app-prompt-box [loading]="loading()" [(prompt)]="prompt" />
    </div>
    @if (chatHistory$ | async; as chatHistory) {
      <app-chat-history [chatHistory]="chatHistory" />
    }
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
export class GenerateTextMultimodalComponent implements OnInit {
  promptBox = viewChild.required(PromptBoxComponent);
  
  geminiService = inject(GeminiService);
  prompt = signal('');
  loading = signal(false);
  imageInfo = signal<ImageInfo | null>(null);

  viewModel = computed(() => ({
    isLoading: this.loading(),
    base64Data: this.imageInfo()?.base64Data,
    mimeType: this.imageInfo()?.mimeType,
    prompt: this.prompt(),   
  }));

  chatHistory$!: Observable<HistoryItem[]>;

  get vm() {
    return this.viewModel();
  }

  ngOnInit(): void {
    this.chatHistory$ = this.promptBox().askMe
      .pipe(
        filter(() => this.vm.prompt !== '' && !!this.vm.base64Data),
        tap(() => this.loading.set(true)),
        switchMap(() => {
          const { isLoading, ...rest } = this.vm;
          return this.geminiService.generateTextFromMultimodal(rest as MultimodalInquiry)
            .pipe(finalize(() => this.loading.set(false)))
        }),
        scan((acc, response) => acc.concat({ prompt: this.prompt(), response }), [] as HistoryItem[]),
        startWith([] as HistoryItem[])
      );
  }
}
