import { Directive, ElementRef, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import { SharedService } from '../services/shared/shared.service';

@Directive({
  selector: '[googlePlacesAutocomplete]',
  standalone: true
})
export class GooglePlacesAutocompleteDirective implements OnInit {
  @Input() autocompleteType: 'country' | 'address' = 'address';
  @Output() placeChanged = new EventEmitter<any>();
  @Output() countryChanged = new EventEmitter<string>();

  constructor(
    private elementRef: ElementRef,
    private ngControl: NgControl,
    private ngZone: NgZone,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    // Listen to input changes
    fromEvent(this.elementRef.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((inputValue: string) => {
          if (!inputValue) return of([]);
          return this.sharedService.autoPlace({ place: inputValue }).pipe(
            map((res: any) => res?.data ? [res.data] : []),
            catchError(() => of([]))
          );
        })
      )
      .subscribe((places: any[]) => {
        this.ngZone.run(() => {
          if (places.length > 0) {
            const place = places[0]; // Take first result
            console.log('Selected place:', place);
            
            // Set formatted address
            if (place.formatted_address) {
              this.ngControl.control?.setValue(place.formatted_address);
              this.ngControl.control?.markAsDirty();
              this.ngControl.control?.markAsTouched();
            }

            this.placeChanged.emit(place);

            // Emit country from address_components
            const countryComponent = place.address_components?.find((c: any) =>
              c.types.includes('country')
            );
            if (countryComponent) {
              this.countryChanged.emit(countryComponent.short_name);
            }
          }
        });
      });
  }
}
