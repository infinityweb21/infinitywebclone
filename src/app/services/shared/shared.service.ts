
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  apiUrl: string = environment.API_URL;

  private data = {
    companyName: 'infinityfarecompare',
    phoneNumber: '(888) 230-2647',
    address: '1876 Harvest Cir Tustin, CA 92780, USA',
    email: 'info@infinityfarecompare.us',
    sendmail: 'developer.infinityweb@gmail.com',
    link: 'https://infinityfarecompare.us/',
    appName: 'Infinity Travel',
  };

  constructor(private http: HttpClient) {}
  private showCookiesSubject = new BehaviorSubject<boolean>(
    this.getFromStorage()
  );

  showCookies$ = this.showCookiesSubject.asObservable();
  private readonly STORAGE_KEY = 'selectedSeatTotal';
  selectedSeatTotal = signal<number>(this.loadFromStorage());

  private getFromStorage(): boolean {
    const value = localStorage.getItem('showCookies');
    return value !== 'false'; // default to true
  }

  acceptCookies(): void {
    localStorage.setItem('showCookies', 'false');
    this.showCookiesSubject.next(false);
  }
  airportlList(city: any): Observable<any> {
    const params = { city };

    return this.http
      .get(`${this.apiUrl}${environment.AIRPORT_LIST}`, { params })
      .pipe(retry(1), catchError(this.errorHandler));
  }
  cityList(city: any): Observable<any> {
    const params = { cityName: city };

    return this.http
      .get(`${this.apiUrl}${environment.CITY_LIST}`, { params })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  getcompanyName(): any {
    return this.data;
  }


  private loadFromStorage(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? parseFloat(stored) : 0;
  }

  setSeatTotal(amount: number) {
    this.selectedSeatTotal.set(amount);
    localStorage.setItem(this.STORAGE_KEY, amount.toString());
  }

  getSeatTotal() {
    return this.selectedSeatTotal();
  }

  seatTotalSignal() {
    return this.selectedSeatTotal;
  }

  clearSeatTotal() {
    this.selectedSeatTotal.set(0);
    localStorage.removeItem(this.STORAGE_KEY);
  }
  private errorHandler(error: any): Observable<never> {
    return throwError(() => error || 'Server Error');
  }
}
