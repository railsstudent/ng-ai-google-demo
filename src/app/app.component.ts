import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { setTitle } from './utils/title.util';
import { GenerateTextComponent } from './gemini/generate-text/generate-text.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GenerateTextComponent],
  template: `
    <div>
      <h2>{{ title }}</h2>
      <app-generate-text />
    </div>
  `,
  styles: `
    div {
      padding: 1rem;
    }

    h2 {
      margin-bottom: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Gemini AI Generate Text Demo';

  constructor() {
    setTitle();
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // const generativeAI = import('@google/generative-ai');
  }

}
