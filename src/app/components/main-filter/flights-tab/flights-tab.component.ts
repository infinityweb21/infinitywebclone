import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FlatpickrDirective } from '../../../directives/flatpickr.directive';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { SearchService } from '../../../services/search.service';
import { SvgIcons } from '../../../shared/svg-icons';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FlightService } from '../../../services/flight/flight.service';
import { TosterService } from '../../../services/common/toaster.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-flights-tab',
  imports: [
    ReactiveFormsModule,
    FlatpickrDirective,
    ClickOutsideDirective,
    NgFor,
    NgIf,
    AutoCompleteModule,
  ],
  templateUrl: './flights-tab.component.html',
  styleUrl: './flights-tab.component.scss',
})
export class FlightsTabComponent {
  protected icons = inject(SvgIcons);
  private destroyRef: DestroyRef = inject(DestroyRef);

  inputValue: string = '';
  showDropdown: boolean = false;
  dropdownOpen: boolean = false;

  selectedAdults: number = 1;
  selectedChildren: number = 0;
  selectedInfants: number = 0;

  private router = inject(Router);
  private searchService = inject(SearchService);

  selectedCabin = { name: 'Economy', value: 'E' };
  departureAirports: any[] = [];
  arrivalAirports: any[] = [];
  allAirports: any[] = [];
  submitted: boolean = false;
  cabinOptions = [
    { name: 'Economy', value: 'E' },
    { name: 'First', value: 'F' },
    { name: 'Business', value: 'B' },
    { name: 'Premium Economy', value: 'P' },
  ];

  adultsList = Array.from({ length: 9 }, (_, i) => i + 1);
  childrenList = Array.from({ length: 8 }, (_, i) => i + 1);
  infantsList = Array.from({ length: 5 }, (_, i) => i);

  flightForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private toasterService: TosterService,
    private sharedService: SharedService
  ) {
    this.flightForm = this.fb.group({
      tripType: ['oneway'],
      departureAirport: [''],
      arrivalAirport: [''],
      departureDate: [''],
      arrivalDate: [''],
      directFlightsOnly: [false],
      passengers: this.fb.group({
        adults: [this.selectedAdults],
        children: [this.selectedChildren],
        infants: [this.selectedInfants],
        cabin: ['E'],
      }),
      multiCitySegments: this.fb.array([]),
    });
    this.handleTripTypeValidation();
    this.updateInput();
  }

  ngOnInit(): void {
    // Replace this with real data from an API if needed
    this.allAirports = [
      { name: 'Los Angeles International Airport (LAX)' },
      { name: 'John F. Kennedy International Airport (JFK)' },
      { name: 'Heathrow Airport (LHR)' },
      { name: 'Dubai International Airport (DXB)' },
      { name: 'Tokyo Haneda Airport (HND)' },
    ];
  }
  private handleTripTypeValidation() {
    const controls = this.flightForm.controls;

    this.flightForm
      .get('tripType')
      ?.valueChanges.subscribe((tripType: string) => {
        this.clearValidators();

        if (tripType === 'oneway') {
          controls['departureAirport'].setValidators(Validators.required);
          controls['arrivalAirport'].setValidators(Validators.required);
          controls['departureDate'].setValidators(Validators.required);
          this.passengersGroup.setValidators(Validators.required);
          this.clearSegments();
        } else if (tripType === 'roundtrip') {
          controls['departureAirport'].setValidators(Validators.required);
          controls['arrivalAirport'].setValidators(Validators.required);
          controls['departureDate'].setValidators(Validators.required);
          controls['arrivalDate'].setValidators(Validators.required);
          this.passengersGroup.setValidators(Validators.required);
          this.clearSegments();
        } else if (tripType === 'multicity') {
          // Set required initially
          this.multiCitySegments.setValidators(Validators.required);

          // Add 1 segment if empty
          if (this.multiCitySegments.length === 0) {
          }

          // Watch for changes and remove validation after at least one is added
          this.multiCitySegments.clearValidators();
          this.multiCitySegments.updateValueAndValidity({ emitEvent: false });
        }

        // Refresh form control validation
        Object.values(controls).forEach((ctrl) => {
          ctrl.updateValueAndValidity({ emitEvent: false });
        });

        this.passengersGroup.updateValueAndValidity();
        this.multiCitySegments.updateValueAndValidity();
      });

    // ✅ Force emit to trigger logic initially
    const tripType = this.flightForm.get('tripType')?.value;
    if (tripType) {
      this.flightForm.get('tripType')?.setValue(tripType);
    }
  }

  private clearValidators() {
    const controls = this.flightForm.controls;

    controls['departureAirport'].clearValidators();
    controls['arrivalAirport'].clearValidators();
    controls['departureDate'].clearValidators();
    controls['arrivalDate'].clearValidators();
    this.passengersGroup.clearValidators();
    this.multiCitySegments.clearValidators();
  }
  filterCountry(event: any): void {
    const query = event.query.toLowerCase();

    this.flightService
      .airportlList(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.departureAirports = res.data.map((airport: any) => ({
            displayName: airport.city ? `${airport.city} - ${airport.country}` : airport.country,
            code: airport.airport_code,
            city: airport.city,
            airport_name: airport.airport_name,
            country: airport.country, // keep full object if needed later
          }));
        },
        error: (err) => {
          this.toasterService.showError(
            err.error.message ||
              'Something went wrong while fetching vendor list!'
          );
        },
      });
  }
  onDepartureSelect(selected: any) {
    this.flightForm.get('departureAirport')?.setValue(selected.code); // store only 'CCU'
  }
  compareCabins = (c1: any, c2: any) => c1?.value === c2?.value;

  get multiCitySegments(): FormArray {
    return this.flightForm.get('multiCitySegments') as FormArray;
  }

  get passengersGroup(): FormGroup {
    return this.flightForm.get('passengers') as FormGroup;
  }
  onDatesSelected(event: { departure: string; arrival?: string }) {
    this.flightForm.get('departureDate')?.setValue(event.departure);
    this.flightForm.get('arrivalDate')?.setValue(event.arrival || '');
  }

  onMultiCityDateSelected(event: { departure: string }, index: number): void {
    const segmentGroup = this.multiCitySegments.at(index) as FormGroup;
    segmentGroup.get('departureDate')?.setValue(event.departure);
  }

  addSegment(): void {
    const segmentGroup = new FormGroup({
      departure: new FormControl(''),
      arrival: new FormControl(''),
      departureDate: new FormControl(''),
    });

    this.multiCitySegments.push(segmentGroup);

    // Optional: force validation re-evaluation
    this.multiCitySegments.updateValueAndValidity({ emitEvent: true });
  }

  removeSegment(index: number): void {
    this.multiCitySegments.removeAt(index);
  }

  clearSegments(): void {
    this.multiCitySegments.clear();
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  selectPassenger(
    type: 'adult' | 'child' | 'infant',
    count: number,
    event: Event
  ) {
    event.stopPropagation();
    if (type === 'adult') {
      this.selectedAdults = count;
      this.passengersGroup.get('adults')?.setValue(count);
    } else if (type === 'child') {
      this.selectedChildren = count;
      this.passengersGroup.get('children')?.setValue(count);
    } else if (type === 'infant') {
      this.selectedInfants = count;
      this.passengersGroup.get('infants')?.setValue(count);
    }
    this.updateInput();
  }

  updateInput() {
    const total =
      this.selectedAdults + this.selectedChildren + this.selectedInfants;

    const selectedCabin = this.passengersGroup.get('cabin')?.value;
    this.selectedCabin = selectedCabin;

    // Find the cabin name from the cabinOptions
    const cabinName =
      this.cabinOptions.find((option) => option.value === selectedCabin)
        ?.name || '';

    this.inputValue = `${total} Passenger${
      total !== 1 ? 's' : ''
    } ${cabinName}`;
  }

  closeDropdown() {
    this.showDropdown = false;
  }
  switchAirports() {
    const departure = this.flightForm.get('departureAirport')?.value;
    const arrival = this.flightForm.get('arrivalAirport')?.value;

    this.flightForm.patchValue({
      departureAirport: arrival,
      arrivalAirport: departure,
    });
  }
  get f() {
    return this.flightForm.controls;
  }
  buildFlightPayload(): any {
    const formValue = this.flightForm.value;
    const passengers = formValue.passengers;
    console.log('passengers', passengers);

    const tripType = formValue.tripType;
    console.log('tripType', tripType);
    const payload: any = {
      CurrencyCode: 'USD',
      NoOfAdults: passengers.adults,
      NoOfInfants: passengers.infants,
      NoOfChildren: passengers.children,
      tripType: tripType,
      source: 'mondee',
      returnDate: '',
      OriginDestination: [],
    };

    const formatDate = (date: string) => {
      if (!date) return '';
      const d = new Date(date);
      return `${String(d.getDate()).padStart(2, '0')}/${String(
        d.getMonth() + 1
      ).padStart(2, '0')}/${d.getFullYear()}`;
    };

    if (tripType === 'oneway') {
      payload.OriginDestination.push({
        DepartureTime: formValue.departureDate,
        DepartureLocationCode: formValue.departureAirport,
        ArrivalLocationCode: formValue.arrivalAirport,
        CabinClass: passengers.cabin,
      });
    } else if (tripType === 'roundtrip') {
      payload.OriginDestination.push(
        {
          DepartureTime: formValue.departureDate,
          DepartureLocationCode: formValue.departureAirport,
          ArrivalLocationCode: formValue.arrivalAirport,
          CabinClass: passengers.cabin,
        },
        {
          DepartureTime: formValue.arrivalDate,
          DepartureLocationCode: formValue.arrivalAirport,
          ArrivalLocationCode: formValue.departureAirport,
          CabinClass: passengers.cabin,
        }
      );
      payload.returnDate = formValue.arrivalDate;
    } else if (tripType === 'multicity') {
      // 🥇 First Segment from main form fields
      payload.OriginDestination.push({
        DepartureTime: formValue.departureDate,
        DepartureLocationCode: formValue.departureAirport,
        ArrivalLocationCode: formValue.arrivalAirport,
        CabinClass: passengers.cabin,
      });

      // ➕ Remaining Segments from multiCitySegments
      this.multiCitySegments.controls.forEach((segment: any) => {
        const segValue = segment.value;

        payload.OriginDestination.push({
          DepartureTime: segValue.departureDate,
          DepartureLocationCode: segValue.departure,
          ArrivalLocationCode: segValue.arrival,
          CabinClass: passengers.cabin,
        });
      });
    }

    return payload;
  }
  arrivalCountry: string = '';
  departCountry: string = '';
  isDomestic: boolean = false;
  arrivalCountries: string[] = [];
  departureCountries: string[] = [];
  onArrivalSelected(event: any) {
    this.arrivalCountry = event?.value?.country || '';
  }
  onDepartSelected(event: any) {
    this.departCountry = event?.value?.country || '';
  }
  onDepartureSelected(event: any, index: number) {
    const country = event?.value?.country || '';
    this.departureCountries[index] = country;
  }

  onArrivalSelectedMulti(event: any, index: number) {
    const country = event?.value?.country || '';
    this.arrivalCountries[index] = country;
  }
  checkIfAllDomestic(): boolean {
    const allCountries = new Set<string>();

    // Add top-level countries if any
    if (this.arrivalCountry) allCountries.add(this.arrivalCountry);
    if (this.departCountry) allCountries.add(this.departCountry);

    // Add countries from arrays
    this.arrivalCountries.forEach((country) => allCountries.add(country));
    this.departureCountries.forEach((country) => allCountries.add(country));

    console.log('All countries involved:', Array.from(allCountries));

    // Domestic only if all are the same
    return allCountries.size === 1;
  }

  searchFlights() {
    this.submitted = true;
    if (this.flightForm.valid) {
      const formValue = this.flightForm.value;

      if (formValue?.tripType == 'multicity') {
        console.log('this.departCountry', this.checkIfAllDomestic());
        this.isDomestic = this.checkIfAllDomestic();
        localStorage.setItem('isDomestic', JSON.stringify(this.isDomestic));
      } else {
        if (this.arrivalCountry === this.departCountry) {
          this.isDomestic = true;
          localStorage.setItem('isDomestic', JSON.stringify(true));
        } else {
          this.isDomestic = false;
          localStorage.setItem('isDomestic', JSON.stringify(false));
        }
      }

      const payload = this.buildFlightPayload();
      console.warn('Final Payload:', payload);
      this.searchService.setSearchData(payload);
      console.log('this.flightForm.value', this.flightForm.value);
      this.router.navigate(['/flights-list']);
      // send to API
    } else {
      this.flightForm.markAllAsTouched();
    }
  }
}
