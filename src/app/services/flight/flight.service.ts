
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  apiUrl: string = environment.API_URL;
  MOBILE_APP_URL: string = environment.MOBILE_APP_URL;
    private fareSummaryData: any; 
  private readonly STORAGE_KEY = 'fare_summary';
   private travelData: any; 
  private readonly TRAVELDATA_KEY = 'travel_data';
    private repriceData: any; 
  private readonly REPRICEDATA_KEY = 'reprice_data';
  constructor(private http: HttpClient) { }
  airportlList(airport_code: any): Observable<any> {
    const params = { airport_code };

    return this.http.get(`${this.apiUrl}${environment.AIRPORT_LIST}`, { params })
      .pipe(retry(1), catchError(this.errorHandler))
  }
    getflightList(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.FLIGHT_LIST}`, data)
      .pipe(retry(1), catchError(this.errorHandler))
  }

      getFlightReprice(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.FLIGHT_REPRICE}`, data)
      .pipe(retry(1), catchError(this.errorHandler))
  }
  
      getFlightAvailableSeat(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.FLIGTH_SEAT_AVILABILITY}`, data)
      .pipe(retry(1), catchError(this.errorHandler))
  }

      flightRequestSeat(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.FLIGHT_SEAT_REQUEST}`, data)
      .pipe(retry(1), catchError(this.errorHandler))
  }
        flightConfirmSeat(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.FLIGHT_BOOKING}`, data)
      .pipe(retry(1), catchError(this.errorHandler))
  }
        createFlightbookings(data: any): Observable<any> {
    return this.http.post(`${this.MOBILE_APP_URL}${environment.CREATE_FLIGHT_BOOKING_MOBILEAPP}`, data)
      .pipe(retry(1), catchError(this.errorHandler))
  }
        getFlightTicket(id: any): Observable<any> {
    return this.http.get(`${this.MOBILE_APP_URL}${environment.GENERATE_FLIGHT_TICKET}/${id}`)
      .pipe(retry(1), catchError(this.errorHandler))
  }
  setFareSummary(data: any): void {
    this.fareSummaryData = data;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  getFareSummary(): any {
    if (!this.fareSummaryData) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      this.fareSummaryData = saved ? JSON.parse(saved) : null;
    }
    return this.fareSummaryData;
  }

  clearFareSummary(): void {
    this.fareSummaryData = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  
    setTravelData(data: any): void {
    this.travelData = data;
    localStorage.setItem(this.TRAVELDATA_KEY, JSON.stringify(data));
  }

  getTravelData(): any {
    if (!this.travelData) {
      const saved = localStorage.getItem(this.TRAVELDATA_KEY);
      this.travelData = saved ? JSON.parse(saved) : null;
    }
    return this.travelData;
  }

  clearTravelData(): void {
    this.travelData = null;
    localStorage.removeItem(this.TRAVELDATA_KEY);
  }

  setRepriceData(data: any): void {
    this.repriceData = data;
    localStorage.setItem(this.REPRICEDATA_KEY, JSON.stringify(data));
  }

  getRepriceData(): any {
    if (!this.repriceData) {
      const saved = localStorage.getItem(this.REPRICEDATA_KEY);
      this.repriceData = saved ? JSON.parse(saved) : null;
    }
    return this.repriceData;
  }

  clearRepriceData(): void {
    this.repriceData = null;
    localStorage.removeItem(this.REPRICEDATA_KEY);
  }

   private seatData: any = null;
  private readonly SEATDATA_KEY = 'SEATDATA';

  setseatData(data: any): void {
    this.seatData = data;
    localStorage.setItem(this.SEATDATA_KEY, JSON.stringify(data));
  }

  getseatData(): any {
    if (!this.seatData) {
      const saved = localStorage.getItem(this.SEATDATA_KEY);
      this.seatData = saved ? JSON.parse(saved) : null;
    }
    return this.seatData;
  }

  clearseatData(): void {
    this.seatData = null;
    localStorage.removeItem(this.SEATDATA_KEY);
  }
  private errorHandler(error: any): Observable<never> {
    return throwError(() => (error || "Server Error"));
  }
}
