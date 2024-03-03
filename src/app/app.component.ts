import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { setTitle } from './utils/title.util';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div>
      <h2>{{ title }}</h2>
      <router-outlet />
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
