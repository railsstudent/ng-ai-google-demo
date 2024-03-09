import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt-box',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <textarea rows="3" [(ngModel)]="prompt"></textarea>
      <!--
      <button (click)="askQuestion.set(vm.formData)" [disabled]="vm.isLoading">{{ vm.buttonText }}</button>
-->
    </div>
  `,
  styles: `
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
export class PromptBoxComponent {
  prompt = signal('');
}
