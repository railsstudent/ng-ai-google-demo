import { Observable, catchError, map, of, retry, tap } from 'rxjs';

export function generateText(numRetries: number) {
    return function(source: Observable<any>) {
      return source.pipe(
          retry(numRetries),
          tap((response) => console.log(response)),
          map((response) => response.candidates?.[0].content?.parts?.[0].text || 'No response' ),
          catchError((err) => {
            console.error(err);
            return of('Error occurs');
          })
        );
      }
  }