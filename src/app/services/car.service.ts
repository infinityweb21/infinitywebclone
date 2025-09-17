import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl: string = environment.CAR_BOOKING;
  private http: HttpClient = inject(HttpClient);

  createCarBookings(data: any): Observable<any> {
    return this.http
      .post(this.apiUrl, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  private errorHandler(error: any): Observable<never> {
    return throwError(() => error || 'Server Error');
  }
}
