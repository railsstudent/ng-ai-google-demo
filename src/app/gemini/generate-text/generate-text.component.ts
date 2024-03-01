import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-generate-text',
  standalone: true,
  imports: [FormsModule, MarkdownComponent],
  template: `
    <p>Input a prompt to receive an answer from AI</p>
    <div>
      <textarea rows="8" [(ngModel)]="prompt"></textarea>
      <button>Ask me anything</button>
    </div>
    <markdown class="markdown" [data]="markdown"></markdown>
    prompt: {{ prompt() }}
  `,
  styles: `
    textarea {
      margin-right: 0.5rem;
      width: 49%;
    }

    button {
        padding: 0.65rem;
        border-radius: 8px;
    }

    .markdown {
      margin-top: 1rem;
      margin-right: 1rem;
      width: 50%;
    }

    ol {
      margin: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateTextComponent {
  prompt = signal('');

  markdown = `## Markdown __rulez__!
  ---
  
  ### Syntax highlight
  \`\`\`typescript
  const language = 'typescript';
  \`\`\`
  
  ### Lists
  1. Ordered list
  2. Another bullet point
     - Unordered list
     - Another unordered bullet
  
  ### Blockquote
  > Blockquote to the max`;
}


// cat << EOF > request.json
// {
//     "contents": [
//         {
//             "role": "user",
//             "parts": [
//                 {
//                     "text": "What is the color of a mango"
//                 }
//             ]
//         }
//     ],
//     "generation_config": {
//         "maxOutputTokens": 1024,
//         "temperature": 0.5,
//         "topP": 1,
//         "topK": 20
//     },
//     "safetySettings": [
//         {
//             "category": "HARM_CATEGORY_HATE_SPEECH",
//             "threshold": "BLOCK_MEDIUM_AND_ABOVE"
//         },
//         {
//             "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
//             "threshold": "BLOCK_MEDIUM_AND_ABOVE"
//         },
//         {
//             "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
//             "threshold": "BLOCK_MEDIUM_AND_ABOVE"
//         },
//         {
//             "category": "HARM_CATEGORY_HARASSMENT",
//             "threshold": "BLOCK_MEDIUM_AND_ABOVE"
//         }
//     ]
// }
// EOF

// API_ENDPOINT="us-central1-aiplatform.googleapis.com"
// PROJECT_ID="generative-ai-408405"
// MODEL_ID="gemini-1.0-pro-001"
// LOCATION_ID="us-central1"

// curl \
// -X POST \
// -H "Authorization: Bearer $(gcloud auth print-access-token)" \
// -H "Content-Type: application/json" \
// "https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:streamGenerateContent" -d '@request.json'