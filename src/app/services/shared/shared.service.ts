
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  apiUrl: string = environment.API_URL;

  private data = {
    companyName: 'Infinity Travels',
    phoneNumber: '(000)000-0000',
    // address: '',
    // email: ''
  };
  
  constructor(private http: HttpClient) { }
  airportlList(city: any): Observable<any> {
    const params = { city };

    return this.http.get(`${this.apiUrl}${environment.AIRPORT_LIST}`, { params })
      .pipe(retry(1), catchError(this.errorHandler))
  }
  cityList(city: any): Observable<any> {
   const params = { cityName:city };

    return this.http.get(`${this.apiUrl}${environment.CITY_LIST}`, { params })
      .pipe(retry(1), catchError(this.errorHandler))
  }  

   getcompanyName(): any {
    return this.data;
  }
  private errorHandler(error: any): Observable<never> {
    return throwError(() => (error || "Server Error"));
  }
}
