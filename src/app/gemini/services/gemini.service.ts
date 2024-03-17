import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, retry, tap } from 'rxjs';
import { GEMINI_GENERATION_CONFIG, GEMINI_PRO_URL, GEMINI_PRO_VISION_URL, GEMINI_SAFETY_SETTINGS } from '../gemini.constant';
import { GeminiResponse } from '../interfaces/generate-response.interface';
import { MultimodalInquiry } from '../interfaces/genmini.interface';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly geminiProUrl = inject(GEMINI_PRO_URL);
  private readonly geminiProVisionUrl = inject(GEMINI_PRO_VISION_URL);
  private readonly generationConfig = inject(GEMINI_GENERATION_CONFIG);
  private readonly safetySetting = inject(GEMINI_SAFETY_SETTINGS);
  private httpClient = inject(HttpClient);

  generateText(prompt: string): Observable<string> {
    return this.httpClient.post<GeminiResponse>(this.geminiProUrl, {
      "contents": [
        {
            "role": "user",
            "parts": [
              {
                "text": prompt
              }
          ]
        }
      ],
      "generation_config": this.generationConfig,
      "safetySettings": this.safetySetting
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .pipe(
      retry(3),
      tap((response) => console.log(response)),
      map((response) => response.candidates?.[0].content?.parts?.[0].text || 'No response' ),
      catchError((err) => {
        console.error(err);
        return of('Error occurs');
      })
    );
  }
  
  generateTextFromMultimodal({ prompt, mimeType, base64Data }: MultimodalInquiry): Observable<string> {
    return this.httpClient.post<GeminiResponse>(this.geminiProVisionUrl, {
      "contents": [
        {
            "role": "user",
            "parts": [
              {
                "text": prompt
              },
              {
                "inline_data": {
                  "mime_type": mimeType,
                  "data": base64Data
                }
              }
          ]
        }
      ],
      "generation_config": this.generationConfig,
      "safetySettings": this.safetySetting
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .pipe(
      retry(3),
      tap((response) => console.log(response)),
      map((response) => response.candidates?.[0].content?.parts?.[0].text || 'No response' ),
      catchError((err) => {
        console.error(err);
        return of('Error occurs');
      })
    );
  }
}
