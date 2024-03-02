import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GEMINI_PRO_URL } from '../gemini.constant';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly geminiProUrl = inject(GEMINI_PRO_URL);
  private httpClient = inject(HttpClient);

  generateText() {
    this.httpClient.post(this.geminiProUrl, {
      "contents": [
        {
            "role": "user",
            "parts": []
        }
      ],
      "generation_config": {
          "maxOutputTokens": 1024,
          "temperature": 0.9,
          "topP": 1
      },
      "safetySettings": [
          {
              "category": "HARM_CATEGORY_HATE_SPEECH",
              "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
              "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
              "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
              "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
              "category": "HARM_CATEGORY_HARASSMENT",
              "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          }
      ]
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  } 
}
