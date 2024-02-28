import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { setTitle } from './utils/title.util';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div>Testing</div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'ng-ai-google-demo';

  constructor() {
    setTitle();
  }

  apiKey = 'AIzaSyD-lmkdh4pTPWib0VM1JxEbPHfsroyGGvs';

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // const generativeAI = import('@google/generative-ai');
  }

}
