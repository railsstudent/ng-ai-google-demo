import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { setTitle } from './utils/title.util';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div>
      <div class="menu-container">
        <ul class="menu">
          <li><a routerLink="/">Generate Text from Text Input</a></li>
          <li>Generate Text from Text and Image Inputs</li>
        </ul>
      </div>
      <h2>{{ title }}</h2>
      <router-outlet />
    </div>
  `,
  styles: `
    div {
      padding: 1rem;
    }

    div.menu-container {
      border: 1px solid back;
      background: gold;
    }

    .menu {
      display: flex;
    }
    .menu > li {
      margin-right: 0.5rem;
      list-style-type: none;
    }

    h2 {
      margin-bottom: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Gemini AI Generate Text Demo';

  constructor() {
    setTitle();
  }
}
