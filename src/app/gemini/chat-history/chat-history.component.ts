import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { HistoryItem } from '../interfaces/history-item.interface';
import { LineBreakPipe } from '../pipes/line-break.pipe';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [MarkdownComponent, LineBreakPipe],
  template: `
    <h3>Chat History</h3>
    @if (chatHistory().length > 0) {
      <ol>
        @for (history of chatHistory(); track history) {
          <li>
            <p>{{ history.prompt }}</p>
            <markdown [data]="lineBreakPipe.transform(history.response)" />
          </li>
        }
      </ol>
    } @else {
      <p>No history</p>
    }
  `,
  styles: `
    p {
      font-size: 1.25rem;
    }

    ol {
      margin: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHistoryComponent {
  chatHistory = input.required<HistoryItem[]>();
  lineBreakPipe = new LineBreakPipe();
}
