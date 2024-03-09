import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [],
  template: `
    <p>
      image-preview works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePreviewComponent {

}
