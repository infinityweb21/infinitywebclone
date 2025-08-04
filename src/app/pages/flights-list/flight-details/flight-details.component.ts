import { Component, DestroyRef, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FlightFilterService } from '../../../services/flight/flight-filter.service';
import { TosterService } from '../../../services/common/toaster.service';
import { FlightService } from '../../../services/flight/flight.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../services/search.service';
import { FlatpickrDirective } from '../../../directives/flatpickr.directive';
import { GooglePlacesAutocompleteDirective } from '../../../directives/google-places-autocomplete.directive';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-flight-details',
  imports: [ CommonModule, ReactiveFormsModule,FlatpickrDirective,GooglePlacesAutocompleteDirective],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.scss'
})
export class FlightDetailsComponent {
  loading: boolean = true;
  private destroyRef: DestroyRef = inject(DestroyRef);
  @ViewChildren('error') errorElements!: QueryList<ElementRef>;

  flights = [
    {
      id: 1,
      route: 'New Delhi IGI to Kolkata',
      date: 'Mon, May 26',
      duration: '2h 35m',
      stops: 'Non stop',
      airline: 'Air India',
      departure: { time: '12:00PM', city: 'New Delhi (C), DEL', code: 'DEL' },
      arrival: { time: '02:40PM', city: 'Kolkata, CCU', code: 'CCU' },
      number: 'Flight 2727',
      aircraftCode: '32N',
      class: 'Economy(H)',
      aircraft: 'Airbus A350-900',
    },
    {
      id: 2,
      route: 'Kolkata to New Delhi IGI',
      date: 'Mon, Jun 02',
      duration: '2h 35m',
      stops: 'Non stop',
      airline: 'Air India',
      departure: { time: '12:00PM', city: 'Kolkata, CCU', code: 'CCU' },
      arrival: { time: '02:40PM', city: 'New Delhi IGI, DEL', code: 'DEL' },
      number: 'Flight 2727',
      aircraftCode: '32N',
      class: 'Economy(H)',
      aircraft: 'Airbus A350-900',
    }
  ];

  upgradeOptions = [
    {
      id: 1,
      airline: 'Air India',
      class: 'Eco Classic',
      price: '5,568.00',
      popular: true,
      baggageGroups: [
        ['free checked baggage allowance', 'free checked baggage allowance'],
        ['free checked baggage allowance', 'free checked baggage allowance', 'free checked baggage allowance', 'free checked baggage allowance']
      ]
    },
    {
      id: 2,
      airline: 'Air India',
      class: 'Eco Classic',
      price: '4,999.00',
      popular: false,
      baggageGroups: [
        ['free checked baggage allowance', 'free checked baggage allowance'],
        ['free checked baggage allowance', 'free checked baggage allowance', 'free checked baggage allowance', 'free checked baggage allowance']
      ]
    },
    {
      id: 3,
      airline: 'Air India',
      class: 'Eco Classic',
      price: '4,999.00',
      popular: false,
      baggageGroups: [
        ['free checked baggage allowance', 'free checked baggage allowance'],
        ['free checked baggage allowance', 'free checked baggage allowance', 'free checked baggage allowance', 'free checked baggage allowance']
      ]
    },
  ];
  itnearyId: string = '';
  getMainDetails: any = '';
  imageUrl: string = 'https://images.trippro.com/AirlineImages/AirLine/GDS/images/';
  classMap: { [key: string]: string } = {
    E: 'Economy',
    F: 'First',
    B: 'Business',
    P: 'Premium Economy'
  };
  selectedAdults: number = 0;
  selectedChildren: number = 0;
  selectedInfants: number = 0;
  selectedCabin = 'E';
  bookingForm!: FormGroup;
  submitted = false;
  travelData:any='';
  segmentSeatMaps:any='';
isSeatAvailable:boolean=false;
isDomestic:boolean=false;
private route:ActivatedRoute=inject(ActivatedRoute);
private router:Router=inject(Router);
     private shareService: SharedService = inject(SharedService);
      getData:any='';
  constructor(private fb: FormBuilder,
    private flightService: FlightService,
    private toasterService: TosterService,
    private filterService: FlightFilterService,
    private searchService: SearchService) {
    this.route.queryParams.subscribe(({ id }) => {
      if (id) {
        this.itnearyId = id;
        console.log('Itinerary ID:', id);
      }
    });
    const isDomestic=localStorage.getItem("isDomestic");
    if(isDomestic=='true'){
      this.isDomestic=true;
    }else{
      this.isDomestic=false;
    }
    this.bookingForm = this.fb.group({
      contactInfo: this.fb.group({
        firstName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{6,15}$/)]]
      }),
      travelers: this.fb.array([])
    });

    this.addTraveler()

  }
  ngOnInit() {
        this.getData=this.shareService.getcompanyName();

    this.searchService.searchData$.subscribe((searchData) => {
      console.log('Received Flight Data:', searchData);
      if (searchData) {
        this.selectedAdults = searchData?.NoOfAdults ?? 0;
        this.selectedChildren = searchData?.NoOfChildren ?? 0;
        this.selectedInfants = searchData?.NoOfInfants ?? 0;
        this.selectedCabin = searchData?.OriginDestination[0].CabinClass || { name: 'Economy', value: 'E' };
      } else {
      }
    });
    this.getFlightsByItinerary();
    this.getAvailableSeatByItinerary();
const tradeldata = this.flightService.getTravelData();
    
   if (tradeldata) {
    this.travelData = tradeldata;
    console.log("this.travelData", this.travelData);

    // Patch contactInfo
    this.bookingForm.get('contactInfo')?.patchValue(tradeldata.contactInfo);

    // Clear existing travelers (optional, depending on use case)
    this.travelers.clear();

    // Patch travelers
    tradeldata.travelers.forEach((traveler: any) => {
      this.addTraveler(); // add new form group
      const index = this.travelers.length - 1;
      this.travelers.at(index).patchValue(traveler);
    });
  } else {
    console.warn('No fare data found.');
  }
  }
onPlaceSelected(place: any, index: number) {
  if (place?.address_components && Array.isArray(place.address_components)) {
    let countryCode = '';

    place.address_components.forEach((component: any) => {
      if (component.types.includes('country')) {
        countryCode = component.short_name; // e.g., 'IN'
      }
    });

    console.log('Selected Country Code:', countryCode);
   
    const travelersArray = this.bookingForm.get('travelers') as FormArray;
    travelersArray.at(index)?.get('passportDetails.issuingCountry')?.setValue(countryCode);
    travelersArray.at(index)?.get('passportDetails.issuingCountry')?.markAsDirty();
    travelersArray.at(index)?.get('passportDetails.issuingCountry')?.markAsTouched();
  }
}
onPlaceSelectedNation(place: any, index: number) {
  if (place?.address_components && Array.isArray(place.address_components)) {
    let countryCode = '';

    place.address_components.forEach((component: any) => {
      if (component.types.includes('country')) {
        countryCode = component.short_name; // e.g., 'IN'
      }
    });

    console.log('Selected Country Code:', countryCode);
   
    const travelersArray = this.bookingForm.get('travelers') as FormArray;
    const travelerGroup = travelersArray.at(index) as FormGroup;
travelerGroup.get('nationality')?.setValue(countryCode);
    travelerGroup.get('nationality')?.markAsDirty();
    travelerGroup.get('nationality')?.markAsTouched();
  }
}
  getFlightsByItinerary() {
    const payload = {
      "ItineraryId": this.itnearyId,
      "AdultPaxCount": this.selectedAdults,
      "ChildPaxCount": this.selectedChildren,
      "InfantPaxCount": this.selectedInfants,
    }
    this.flightService.getFlightReprice(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log("res", res);
        if(res?.data?.flight!=''){
       this.getMainDetails = res?.data?.flight || '';
        this.flightService.setRepriceData(res);
        }else{
          this.router.navigate(['/flights-list']);
        }
 
      },
      error: (err) => {
        this.toasterService.showError(err.error.message || 'Something went wrong while fetching vendor list!')
      }
    })
  }
  get f() { return this.bookingForm.controls; }

  get contactInfoGroup() {
    return this.bookingForm.get('contactInfo') as FormGroup;
  }

  get travelers(): FormArray {
    return this.bookingForm.get('travelers') as FormArray;
  }
  // ✅ Custom validator for date of birth
  dateNotInFuture(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate > today ? { futureDate: true } : null;
    };
  }

  // ✅ Custom validator for passport issuingDate < expiryDate
// issuingBeforeExpiry(): ValidatorFn {
//   return (group: AbstractControl): ValidationErrors | null => {
//     const issuingDate = group.get('issuingDate')?.value;
//     const expiryDate = group.get('expiryDate')?.value;

//     if (!issuingDate || !expiryDate) return null;

//     const issue = new Date(issuingDate);
//     const expiry = new Date(expiryDate);

//     return issue > expiry
//       ? { issuingAfterExpiry: true }
//       : null;
//   };
// }
issuingBeforeExpiry(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const issuingDate = group.get('issuingDate')?.value;
    const expiryDate = group.get('expiryDate')?.value;

    if (!issuingDate || !expiryDate) return null;

    const issue = new Date(issuingDate);
    const expiry = new Date(expiryDate);

    if (isNaN(issue.getTime()) || isNaN(expiry.getTime())) {
      return null; 
    }

    return issue >= expiry ? { issuingAfterExpiry: true } : null;
  };
}

newTraveler(): FormGroup {
  const passportGroup = this.fb.group({
    passportNumber: [''],
    issuingDate: [''],
    expiryDate: [''],
    issuingCountry: ['']
  }, { validators: this.issuingBeforeExpiry() });

  if (!this.isDomestic) {
    // Make all fields required if it's international
    passportGroup.get('passportNumber')?.setValidators([Validators.required]);
    passportGroup.get('issuingDate')?.setValidators([Validators.required]);
    passportGroup.get('expiryDate')?.setValidators([Validators.required]);
    passportGroup.get('issuingCountry')?.setValidators([Validators.required]);
  }

  // Always update control validity
  Object.values(passportGroup.controls).forEach(control => control.updateValueAndValidity());

  return this.fb.group({
    PaxType: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    dateOfBirth: ['', [Validators.required, this.dateNotInFuture()]],
    gender: ['', Validators.required],
    nationality: ['', Validators.required],
    passportDetails: passportGroup
  });
}
updateTravelerPassportValidators(): void {
  const travelers = this.bookingForm.get('travelers') as FormArray;

  travelers.controls.forEach((traveler: AbstractControl) => {
    const passportGroup = traveler.get('passportDetails') as FormGroup;

    ['passportNumber', 'issuingDate', 'expiryDate', 'issuingCountry'].forEach(field => {
      const control = passportGroup.get(field);
      if (control) {
        if (this.isDomestic) {
          control.clearValidators();
        } else {
          control.setValidators([Validators.required]);
        }
        control.updateValueAndValidity();
      }
    });
  });
}
getPassportControl(traveler: AbstractControl, controlName: string): AbstractControl | null {
  return traveler.get('passportDetails.' + controlName);
}

  addTraveler(): void {
    this.travelers.push(this.newTraveler());
  }

  removeTraveler(i: number): void {
    if (this.travelers.length > 1) {
      this.travelers.removeAt(i);
    } else {
      alert('You must have at least one traveler.');
    }
  }
scrollToFirstError() {
    setTimeout(() => {
      const firstErrorElement = this.errorElements?.find(el => {
        return el.nativeElement?.querySelector('.ng-invalid');
      });
      if (firstErrorElement) {
        firstErrorElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.bookingForm.invalid) {
          this.bookingForm.markAllAsTouched();

       this.scrollToFirstError();
      console.log('Form is invalid', this.bookingForm.value);
      return;
    }

    console.log('Form submitted successfully!', this.bookingForm.value);
  }

  getControl(formGroup: AbstractControl, controlName: string): AbstractControl | null {
    return formGroup.get(controlName);
  }
  travelProtectionAdded = false;
  travelProtectionAmount = 1106.19;
  markupPercentage: number = 10;
  travelProtectionTotal: any = 0;
  getFareSubtotal(paxType: string, count: number): number {
    const fare = this.getMainDetails?.Fares?.find((f: { PaxType: string; }) => f.PaxType === paxType);
    if (!fare) return 0;
    const baseFareWithMarkup = fare.BaseFare + (fare.BaseFare * this.markupPercentage / 100);
    return baseFareWithMarkup * count;
  }
getPassportDetails(traveler: AbstractControl): AbstractControl {
  return traveler.get('passportDetails') as AbstractControl;
}
  getSurchargeSubtotal(paxType: string, count: number): number {
    const fare = this.getMainDetails?.Fares?.find((f: { PaxType: string; }) => f.PaxType === paxType);
    if (!fare) return 0;
    const taxesWithMarkup = fare.Taxes + (fare.Taxes * this.markupPercentage / 100);
    return taxesWithMarkup * count;
  }

  getTravelProtectionTotal(): number {
    const totalPax = this.selectedAdults + this.selectedChildren + this.selectedInfants;
    return this.travelProtectionAdded ? this.travelProtectionAmount * totalPax : 0;
  }

  getTotal(): number {
    this.updateTravelProtectionTotal();
    const totalFare =
      this.getFareSubtotal('ADT', this.selectedAdults) +
      this.getFareSubtotal('CHD', this.selectedChildren) +
      this.getFareSubtotal('INF', this.selectedInfants);

    const totalSurcharge =
      this.getSurchargeSubtotal('ADT', this.selectedAdults) +
      this.getSurchargeSubtotal('CHD', this.selectedChildren) +
      this.getSurchargeSubtotal('INF', this.selectedInfants);
    return totalFare + totalSurcharge + this.getTravelProtectionTotal();
  }
  updateTravelProtectionTotal(): void {
    this.travelProtectionTotal = this.getTravelProtectionTotal();
  }
  toggleTravelProtection() {
    this.travelProtectionAdded = !this.travelProtectionAdded;
  }

  getFirstSegmentBaggage(baggageAllowance: any): any[] {
    if (!baggageAllowance) return [];

    const firstKey = Object.keys(baggageAllowance)[0]; // e.g., "CCU-DXB"
    const baggageList = baggageAllowance[firstKey];

    return baggageList?.map((bag: any) => ({
      ...bag,
      chargeAmount: bag.chargeAmount ?? 0 // default to 0 if undefined
    })) || [];
  }
  getLastSegmentBaggage(baggageAllowance: any): any[] {
    if (!baggageAllowance) return [];

    const keys = Object.keys(baggageAllowance);
    if (keys.length === 0) return [];

    const lastKey = keys[keys.length - 1];
    const baggageList = baggageAllowance[lastKey];

    return baggageList?.map((bag: any) => ({
      ...bag,
      chargeAmount: bag.chargeAmount ?? 0 // fallback if not defined
    })) || [];
  }
  getSegmentMealKeys(meals: { [key: string]: string } | undefined): string[] {
    return meals ? Object.keys(meals) : [];
  }


  goToCheckout(){
     if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
      this.flightService.setTravelData(this.bookingForm.value);
    const fareSummary = {
    adults: this.selectedAdults,
    children: this.selectedChildren,
    infants: this.selectedInfants,
    fareSubtotal: {
      ADT: this.getFareSubtotal('ADT', this.selectedAdults),
      CHD: this.getFareSubtotal('CHD', this.selectedChildren),
      INF: this.getFareSubtotal('INF', this.selectedInfants)
    },
    surchargeSubtotal: {
      ADT: this.getSurchargeSubtotal('ADT', this.selectedAdults),
      CHD: this.getSurchargeSubtotal('CHD', this.selectedChildren),
      INF: this.getSurchargeSubtotal('INF', this.selectedInfants)
    },
    travelProtectionAdded:this.travelProtectionAdded,
    travelProtectionTotal: this.getTravelProtectionTotal(),
    totalAmount: this.getTotal()
  };
  console.log("this.travelProtectionAdded",this.travelProtectionAdded)
  this.flightService.setFareSummary(fareSummary);

  if(this.isSeatAvailable){
 this.router.navigate(['/select-seats'],{
      queryParams:{
        id:this.itnearyId
      }
    });
  }else{
     this.router.navigate(['/payment'],{
      queryParams:{
        id:this.itnearyId
      }
    });
  }
   
  }

    getAvailableSeatByItinerary() {
    const payload = {
      ItineraryId: this.itnearyId,
    };
    this.flightService
      .getFlightAvailableSeat(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.segmentSeatMaps = res?.data?.segmentSeatMap || [];
          if (this.segmentSeatMaps.length > 0) {
            this.isSeatAvailable=true
          }
        },
        error: (err) => {
          this.toasterService.showError(
            err.error.message ||
              'Something went wrong while fetching vendor list!'
          );
        },
      });
  }
}
