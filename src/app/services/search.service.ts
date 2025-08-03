import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface FlightFilters {
  airlines: string[];
  stopes: number[];
  rangeValues: number[];
  departureTime: string;
  arrivalTime: string;
  returnDepartureTime: string;
  returnArrivalTime: string;
}

const DEFAULT_FILTERS: FlightFilters = {
  airlines: [],
  stopes: [],
  rangeValues: [0, 10000],
  departureTime: '',
  arrivalTime: '',
  returnDepartureTime: '',
  returnArrivalTime: ''
};
@Injectable({
  providedIn: 'root',
})
export class SearchService {
   private searchDataSubject = new BehaviorSubject<any>(this.getFromStorage());
   private hotelSearchDataSubject = new BehaviorSubject<any>(this.getHotelFromStorage());

  searchData$ = this.searchDataSubject.asObservable();
  hotelSearchData$ = this.hotelSearchDataSubject.asObservable();



  setSearchData(data: any) {
    this.searchDataSubject.next(data);
    localStorage.setItem('flightSearchData', JSON.stringify(data)); // ✅ persist
  }

  getFromStorage() {
    const data = localStorage.getItem('flightSearchData');
    return data ? JSON.parse(data) : null;
  }

  getCurrentData() {
    return this.searchDataSubject.value;
  }


   setSearchHotelData(data: any) {
    this.hotelSearchDataSubject.next(data);
    localStorage.setItem('hotelSearchData', JSON.stringify(data)); // ✅ persist
  }

  getHotelFromStorage() {
    const data = localStorage.getItem('hotelSearchData');
    return data ? JSON.parse(data) : null;
  }

  getCurrentHotelData() {
    return this.hotelSearchDataSubject.value;
  }
  clearSearchData() {
  localStorage.removeItem('flightSearchData');
  this.searchDataSubject.next(null);
}
}
