import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { ImageInfo } from '../interfaces/genmini.interface';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  template: `
    <div>
      <label for="fileInput">Select an image:</label>
      <input id="fileInput" name="fileInput" (change)="fileChange($event)"
        alt="image input" type="file" accept=".jpg,.jpeg,.png" />
    </div>
    @if(imageInfo().base64DataURL) {
      <img [src]="imageInfo().base64DataURL" [alt]="imageInfo().filename" width="250" height="250" />
    }
  `,
  styles: `
    input[type="file"] {
      margin-bottom: 0.75rem;
    }

    label {
      margin-right: 0.5rem;
    }

    img {
      object-fit: contain;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePreviewComponent {
  imageInfo = signal<ImageInfo>({
    base64DataURL: '',
    base64Data: '',
    mimeType: '',
    filename: '',
  });

  @Output()
  imageChange = new EventEmitter<ImageInfo>();
  
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
          mimeType: imageFile.type,
          filename: imageFile.name
        });
        this.imageChange.emit(this.imageInfo());
      }
    }
  }
}
