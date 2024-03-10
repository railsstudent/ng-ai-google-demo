import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="menu-container">
      <ul class="menu">
        <li><a routerLink="/">Generate Text from Text Input</a></li>
        <li><a routerLink="/text-multimodal">Generate Text from Text and Image Inputs</a></li>
      </ul>
    </div>
  `,
  styles: `
    div.menu-container {
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin-bottom: 1rem;

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenuComponent {

}
