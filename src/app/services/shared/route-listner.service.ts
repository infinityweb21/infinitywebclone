import { inject, Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FlightFilterService } from '../flight/flight-filter.service';

@Injectable({
  providedIn: 'root'
})
export class RouteListenerService {
  private router:Router=inject(Router);
  constructor( private filterService: FlightFilterService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      const fromFlight = this.router.url.includes('/flight');
      const toFlight = event.url.includes('/flight');

      if (fromFlight && !toFlight) {
        this.filterService.resetFilters();
      }
    });
  }
}
