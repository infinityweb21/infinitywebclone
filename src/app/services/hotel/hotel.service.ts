import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  apiUrl: string = environment.API_URL
  constructor(private http: HttpClient) { }
  private selectedRoomSubject = new BehaviorSubject<any>(this.getFromStorage());
  selectedRoom$ = this.selectedRoomSubject.asObservable();



  setSearchData(data: any) {
    this.selectedRoomSubject.next(data);
    localStorage.setItem('selectectedRoom', JSON.stringify(data)); // ✅ persist
  }

  getFromStorage() {
    const data = localStorage.getItem('selectectedRoom');
    return data ? JSON.parse(data) : null;
  }



  hotelList(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.HOTEL_LIST}`, payload)
      .pipe(retry(1), catchError(this.errorHandler))
    // return of(this.staticHotelData)
  }

  hotelDetails(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.HOTEL_DETAILS}`, payload)
      .pipe(retry(1), catchError(this.errorHandler))
  }

  hotelRooms(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.HOTEL_ROOM_DETAILS}`, payload)
      .pipe(retry(1), catchError(this.errorHandler))
  }
  hotelBooking(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.HOTEL_ROOM_BOOK}`, payload)
      .pipe(retry(1), catchError(this.errorHandler))
  }
  getBookingDetails(tripId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${environment.HOTEL_BOOKING_DETAILS}/${tripId}`)
      .pipe(retry(1), catchError(this.errorHandler))
  }
  createBooking(payload: any): Observable<any> {
    return this.http.post(`${environment.MOBILE_APP_URL}${environment.CREATE_BOOKING}`, payload)
      .pipe(retry(1), catchError(this.errorHandler))
  }
  getCustomerBookingDetails(bookingId: string): Observable<any> {
    return this.http.get(`${environment.MOBILE_APP_URL}${environment.CUSTOMER_BOOKING_DETAILS}/${bookingId}`)
      .pipe(retry(1), catchError(this.errorHandler))
  }
  generateHotelBookingTicket(bookingId: string) {
    return this.http.get(`${environment.MOBILE_APP_URL}${environment.GENERATE_TICKET_PDF}/${bookingId}`)
      .pipe(retry(1), catchError(this.errorHandler))
  }
  private errorHandler(error: any): Observable<never> {
    return throwError(() => (error || "Server Error"));
  }
}
