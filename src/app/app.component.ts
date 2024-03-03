import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { setTitle } from './utils/title.util';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppMenuComponent],
  template: `
    <div>
      <app-app-menu />
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
export class AppComponent {
  title = 'Gemini AI Generate Text Demo';

  constructor() {
    setTitle();
  }
}
