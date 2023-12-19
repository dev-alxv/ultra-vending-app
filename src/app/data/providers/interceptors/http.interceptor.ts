import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'X-RapidAPI-Key': `718fe5c4f5mshda31d7732868dc6p18f678jsn61177874ddc1`,
      },
    });

    if (true) {
      console.log(`INTERCEPT HTTP >>  `, request);
    }

    return timer(100) // <== Wait
      .pipe(
        switchMap(
          // <== Switch to the Http Stream
          () => next.handle(request)
        )
      );
  }
}
