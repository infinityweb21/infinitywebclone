import { Injectable } from '@angular/core';
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
  rangeValues: [0, 1000000],
  departureTime: '',
  arrivalTime: '',
  returnDepartureTime: '',
  returnArrivalTime: ''
};

@Injectable({
  providedIn: 'root'
})
export class FlightFilterService {
  private readonly storageKey = 'flightFilters';

  private filterSubject = new BehaviorSubject<FlightFilters>(this.loadFilters());
  filters$ = this.filterSubject.asObservable();

  constructor() {}

  private loadFilters(): FlightFilters {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : { ...DEFAULT_FILTERS };
  }

  get currentFilters(): FlightFilters {
    return this.filterSubject.getValue();
  }

  setFilters(filters: FlightFilters) {
    localStorage.setItem(this.storageKey, JSON.stringify(filters));
    this.filterSubject.next(filters);
  }

  resetFilters() {
    localStorage.removeItem(this.storageKey);
    this.filterSubject.next({ ...DEFAULT_FILTERS });
  }
}
