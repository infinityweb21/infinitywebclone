import { Component, DestroyRef, inject } from '@angular/core';
import { SvgIcons } from '../../../../../shared/svg-icons';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../../../../services/flight/flight.service';
import { TosterService } from '../../../../../services/common/toaster.service';
import { FlightFilterService } from '../../../../../services/flight/flight-filter.service';
import { SearchService } from '../../../../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GooglePlacesAutocompleteDirective } from '../../../../../directives/google-places-autocomplete.directive';
import { SharedService } from '../../../../../services/shared/shared.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat, NgxIntlTelInputComponent, NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-flight-booking-payment',
  imports: [FormsModule, ReactiveFormsModule,CommonModule,GooglePlacesAutocompleteDirective,NgxIntlTelInputModule],
  templateUrl: './flight-booking-payment.component.html',
  styleUrl: './flight-booking-payment.component.scss',
})
export class FlightBookingPaymentComponent {
  protected icon = inject(SvgIcons);
  private _route: Router = inject(Router);
  selectedAdults: number = 0;
  selectedChildren: number = 0;
  selectedInfants: number = 0;
  selectedCabin = 'E';
  checkoutForm!: FormGroup;
separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  paymentMethods = [
    {
      value: 'VI',
      label: 'Visa',
      icon: 'assets/images/payment-icon/visa.png',
    },
    {
      value: 'CA',
      label: 'MasterCard',
      icon: 'assets/images/payment-icon/master.png',
    },
    {
      value: 'MI',
      label: 'Maestro',
      icon: 'assets/images/payment-icon/maestro.png',
    },
    { value: 'JB', label: 'JCB', icon: 'assets/images/payment-icon/jcb.png' },
    {
      value: 'DS',
      label: 'Discover',
      icon: 'assets/images/payment-icon/discover.png',
    },
    {
      value: 'AX',
      label: 'American Express',
      icon: 'assets/images/payment-icon/american.png',
    },
  ];

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  years = ['2025', '2026', '2027', '2028', '2029'];

  billingFields = [
    {
      name: 'street',
      label: 'Street *',
      placeholder: 'Local Address',
      type: 'input',
    },
    { name: 'City', label: 'City', placeholder: 'City', type: 'input' },
    { name: 'ZipCode', label: 'Zip', placeholder: 'Zip Code', type: 'input' },
    {
      name: 'State',
      label: 'State',
      type: 'input',
       placeholder: 'State',
    },
    {
      name: 'Country',
      label: 'Country',
      type: 'input',
       placeholder: 'Country',
    },
    {
      name: 'BillingPhoneNum',
      label: 'Contact Number',
      placeholder: 'Contact Number',
      type: 'input',
    },
  ];
  itnearyId: string = '';
  getMainDetails: any = '';
  travelProtectionAdded = false;
  travelProtectionAmount = 1106.19;
  travelProtectionTotal: any = 0;
fareSummary: any;
selectedSeatTotal: number = 0;
serviceTaxRate: number = 0.18; // 18% GST example
serviceTaxAmount: number = 0;
finalTotal: number = 0;
SeatAssignmentFee:number=0;
    private destroyRef : DestroyRef =inject(DestroyRef)
discountAmount: number = 0;
basefareAmount:number=0;
taxAmount:number=0;
totalAmount:number=0;
markup:number=10;
  travelData:any=[];
    travelSeat:any[]=[];
flattenedSeatData:any=[];
flightDetails:any[]=[];
getFlights: any='';
pnr:any='';
flightBookingResponse: any;
    private shareService: SharedService = inject(SharedService);
    getData:any='';
  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private toasterService: TosterService,
    private filterService: FlightFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {
    this.route.queryParams.subscribe(({ id }) => {
      if (id) {
        this.itnearyId = id;
        console.log('Itinerary ID:', id);
      }
    });
     this.checkoutForm = this.fb.group({
    CardNumber: ['', [Validators.required, Validators.pattern(/^\d{13,19}$/)]],
    cardHolder: ['', Validators.required],
    ExpiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/)]],
    CVV: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    street: ['', Validators.required],
    City: ['', Validators.required],
    ZipCode: ['', Validators.required],
    State: ['', Validators.required],
    Country: ['', Validators.required],
    BillingPhoneNum: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
  });
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
    const summary = this.flightService.getFareSummary();
    
  if (summary) {
    this.fareSummary = summary;

    // Travel protection
    this.travelProtectionAdded = summary.travelProtectionAdded || false;
    this.travelProtectionAmount = summary.travelProtectionTotal || 0;
   const result = this.calculateDiscount(summary.fareSubtotal, summary.surchargeSubtotal);
this.discountAmount = result.totalDiscount; // ✅ Only assign the discount number
this.basefareAmount=result.netFare; 
this.taxAmount=result.netSurcharge;
this.totalAmount=result.totalAfterDiscount;


    // Calculate on load
    this.updateTotalWithSeatAndServiceTax();
  } else {
    console.warn('No fare summary found.');
  }
      const tradeldata = this.flightService.getTravelData();
    
  if (tradeldata) {
    this.travelData = tradeldata;
    console.log("this.travelData",this.travelData)
  } else {
    console.warn('No fare data found.');
  }
  const travelseat = this.flightService.getseatData();
    
   if (travelseat && travelseat.SeatRequest) {
    this.travelSeat = travelseat;

 // Flatten all segment arrays like firstseg, secondseg, etc. into one array
const allSeatSegments = travelseat.SeatRequest.flatMap((segmentGroup: any) => {
  const segmentKey = Object.keys(segmentGroup)[0]; // e.g., 'firstseg', 'secondseg'
  const segmentArray = Array.isArray(segmentGroup[segmentKey]) ? segmentGroup[segmentKey] : [];
  
  // Ensure flightNum is a number in each object
  return segmentArray.map((seatObj: any) => ({
    ...seatObj,
    flightNum: Number(seatObj.flightNum)
  }));
});

// Store or use the flattened array
this.flattenedSeatData = allSeatSegments;

    console.log("Flattened Seat Data:", this.flattenedSeatData);
  } else {
    console.warn('No seat data found.');
    this.flattenedSeatData = [];
  }

  }
    getFlightsByItinerary() {
            const res = this.flightService.getRepriceData();
            console.log(res,"res");
        this.getMainDetails = res?.data?.flight;
        this.getFlights = res?.data?.flight?.ValidatingCarrierName;
        this.flightDetails = this.generateFlightDetails(res?.data);
  }
  generateFlightDetails(data: any): any[] {
  const baseImageUrl = 'https://images.trippro.com/AirlineImages/AirLine/GDS/images/';
  const cityPairs = data?.flight?.Citypairs || [];
  const flightDetails: any[] = [];

  cityPairs.forEach((pair: any, index: number) => {
    const flightType = index === 0 ? 1 : 2; // 1 for onward, 2 for return
    pair.FlightSegment.forEach((segment: any) => {
      flightDetails.push({
        dep_airportname: segment.OriginAirportName || '',
        dep_cityname: segment.DepartureDisplayName || '',
        dep_countryname: '', // Not present in response
        dep_airportcode: segment.DepartureLocationCode || '',
        dep_latitude: '',
        dep_longitude: '',
        dep_timezone: segment.DepartureTimeZone || '',
        dep_timezoneshort: '',
        arr_airportcode: segment.ArrivalLocationCode || '',
        arr_airportname: segment.DestinationAirportName || '',
        arr_cityname: segment.DisplayName || '',
        arr_countryname: '', // Not present in response
        arr_latitude: '',
        arr_longitude: '',
        arr_timezone: segment.ArrivalTimeZone || '',
        arr_timezoneshort: '',
        flightNo: segment.FlightNumber,
        iatacode: segment.MarketingAirline,
        name: segment.MarketingAirlineName || '',
        cabin: segment.CabinClass === 'E' ? 'Economy' : segment.CabinClass,
        class: segment.CabinClass === 'E' ? 'Economy' : segment.CabinClass,
        dep_date: segment.DepartureDateTime,
        dep_day: new Date(segment.DepartureDateTime).toLocaleDateString('en-US', { weekday: 'long' }),
        arr_date: segment.ArrivalDateTime,
        arr_day: new Date(segment.ArrivalDateTime).toLocaleDateString('en-US', { weekday: 'long' }),
        duration: segment.Duration,
        distance_miles: '',
        distance_km: '',
        flightLogo: baseImageUrl + segment.FlightLogoName,
        transit_time: '',
        flight_type: flightType
      });
    });
  });

  return flightDetails;
}

calculateDiscount(
  fareSubtotal: { [key: string]: number },
  surchargeSubtotal: { [key: string]: number }
): {
  totalDiscount: number,
  actualFare: number,
  actualSurcharge: number,
  totalBeforeDiscount: number,
  netFare: number,
  netSurcharge: number,
  totalAfterDiscount: number
} {
  let totalDiscount = 0;
  let actualFare = 0;
  let actualSurcharge = 0;

  const types: Array<'ADT' | 'CHD' | 'INF'> = ['ADT', 'CHD', 'INF'];
  const discountRate = this.markup / 100;

  types.forEach(type => {
    const fare = fareSubtotal?.[type] || 0;
    const surcharge = surchargeSubtotal?.[type] || 0;

    actualFare += fare;
    actualSurcharge += surcharge;

    totalDiscount += (fare + surcharge) * discountRate;
  });

  const totalBeforeDiscount = actualFare + actualSurcharge;

  const netFare = actualFare - (actualFare * discountRate);
  const netSurcharge = actualSurcharge - (actualSurcharge * discountRate);
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    totalDiscount: parseFloat(totalDiscount.toFixed(2)),
    actualFare: parseFloat(actualFare.toFixed(2)),
    actualSurcharge: parseFloat(actualSurcharge.toFixed(2)),
    totalBeforeDiscount: parseFloat(totalBeforeDiscount.toFixed(2)),
    netFare: parseFloat(netFare.toFixed(2)),
    netSurcharge: parseFloat(netSurcharge.toFixed(2)),
    totalAfterDiscount: parseFloat(totalAfterDiscount.toFixed(2))
  };
}

  getCardBrand(pan: string, includeSubTypes = false): string {
  const visaRegex = /^4[0-9]{0,}$/;
  const vprecaRegex = /^428485[0-9]{0,}$/;
  const postepayRegex = /^(402360|402361|403035|417631|529948)[0-9]{0,}$/;
  const cartasiRegex = /^(432917|432930|453998)[0-9]{0,}$/;
  const entropayRegex = /^(406742|410162|431380|459061|533844|522093)[0-9]{0,}$/;
  const o2moneyRegex = /^(422793|475743)[0-9]{0,}$/;

  const mastercardRegex = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/;
  const maestroRegex = /^(5[06789]|6)[0-9]{0,}$/;
  const kukuruzaRegex = /^525477[0-9]{0,}$/;
  const yunacardRegex = /^541275[0-9]{0,}$/;

  const amexRegex = /^3[47][0-9]{0,}$/;
  const dinersRegex = /^3(?:0[0-5]|[689])[0-9]{0,}$/;
  const discoverRegex = /^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$/;
  const jcbRegex = /^(?:2131|1800|35)[0-9]{0,}$/;

  if (jcbRegex.test(pan)) {
    return 'Jcb';
  }

  if (amexRegex.test(pan)) {
    return 'AX';
  }

  if (dinersRegex.test(pan)) {
    return 'Diners Club';
  }

  if (includeSubTypes) {
    if (vprecaRegex.test(pan)) return 'v-preca';
    if (postepayRegex.test(pan)) return 'postepay';
    if (cartasiRegex.test(pan)) return 'cartasi';
    if (entropayRegex.test(pan)) return 'entropay';
    if (o2moneyRegex.test(pan)) return 'o2money';
    if (kukuruzaRegex.test(pan)) return 'kukuruza';
    if (yunacardRegex.test(pan)) return 'yunacard';
  }

  if (visaRegex.test(pan)) {
    return 'VI';
  }

  if (mastercardRegex.test(pan)) {
    return 'CA';
  }

  if (discoverRegex.test(pan)) {
    return 'DS';
  }

  if (maestroRegex.test(pan)) {
    return pan.startsWith('5') ? 'CA' : 'Maestro';
  }

  return 'unknown';
}


    getTravelerTotal(type: 'ADT' | 'CHD' | 'INF'): number {
  const fare = this.fareSummary?.fareSubtotal?.[type] || 0;
  return fare ;
}
  getTotalServiceCharges(): number {
  const s = this.fareSummary?.surchargeSubtotal || {};
  return (s.ADT || 0) + (s.CHD || 0) + (s.INF || 0);
}
  updateTotalWithSeatAndServiceTax(): void {
  const baseFare = this.fareSummary?.totalAmount || 0;
  const travelProtection = this.travelProtectionAdded ? this.travelProtectionAmount : 0;

  const preTax = baseFare + this.selectedSeatTotal + travelProtection;
  this.finalTotal = preTax ;
}
toggleTravelProtection(): void {
 this.travelProtectionAdded = !this.travelProtectionAdded;

  this.updateTotalWithSeatAndServiceTax();
}
 onPlaceSelected(place: any) {
  console.log('Selected place:', place);

  if (place && place.formatted_address) {
    const formattedAddress = `${place.name}`;
    this.checkoutForm.get('street')?.setValue(formattedAddress);
    this.checkoutForm.get('street')?.markAsDirty();

    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      console.log('Location coordinates:', { lat, lng });
    }

    // Extract address components
    const addressComponents = place.address_components;
    let city = '';
    let state = '';
    let country = '';
    let zipCode = '';

    addressComponents.forEach((component: any) => {
      const types = component.types;

      if (types.includes('locality')) {
        city = component.long_name;
      }

      if (types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }

      if (types.includes('country')) {
        country = component.short_name;
      }

      if (types.includes('postal_code')) {
        zipCode = component.long_name;
      }
    });

    // Patch form fields
    this.checkoutForm.patchValue({
      City: city,
      State: state,
      Country: country,
      ZipCode: zipCode
    });

    console.log({ city, state, country, zipCode });
  }
}
formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const mm = (d.getMonth() + 1).toString().padStart(2, '0');
  const dd = d.getDate().toString().padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}
  submitForm() {
    
    if (this.checkoutForm.valid) {
      console.log('Form submitted:', this.checkoutForm.value);
      
        const BookItineraryPaxDetail = this.travelData?.travelers?.map((traveler: any) => {
  return {
    PaxType: traveler.PaxType,
    Gender: traveler.gender === 'male' ? 'M' : traveler.gender === 'female' ? 'F' : '',
    UserTitle: traveler.gender === 'male' ? 'Mr.' : traveler.gender === 'female' ? 'Ms.' : '',
    FirstName: traveler.firstName,
    MiddleName: traveler.middleName,
    LastName: traveler.lastName,
    DateOfBirth: this.formatDate(traveler.dateOfBirth),
    PassportNumber: traveler?.passportDetails?.passportNumber,
    CountryOfIssue: traveler?.passportDetails?.issuingCountry,
    Nationality: traveler?.nationality,
    PassportIssueDate: traveler?.passportDetails?.issuingDate!=''?this.formatDate(traveler?.passportDetails?.issuingDate):traveler?.passportDetails?.issuingDate,
    PassportExpiryDate: traveler?.passportDetails?.expiryDate!=''?this.formatDate(traveler?.passportDetails?.expiryDate):traveler?.passportDetails?.expiryDate,
  };
});
console.log("BookItineraryPaxDetail",BookItineraryPaxDetail);

  const formValue = this.checkoutForm.value;
const contactInfo = this.travelData?.contactInfo || {};

// Construct final payload object
const paymentPayload = {
  ItineraryId: this.itnearyId,
    "AgentMarkup":this.discountAmount,
    "BookItineraryPaxDetail":BookItineraryPaxDetail,
  PhoneNumber: contactInfo.phoneNumber.number || '',
  AlternatePhoneNumber: '',
  Email: contactInfo.email || '',
  PaymentType: 'CC',
  CardType: this.getCardBrand(formValue.CardNumber),
  CardNumber: formValue.CardNumber,
  CVV: formValue.CVV,
  ExpiryDate: formValue.ExpiryDate,
  BillingPhoneNum: formValue.BillingPhoneNum.number,
  Name: contactInfo.firstName || '', // You can also combine first/last if needed
  Address1: formValue.street,
  Address2: '',
  City: formValue.City,
  ZipCode: formValue.ZipCode,
  Country: formValue.Country,
  State: formValue.State,
  SeatRequest:this.flattenedSeatData
};
const confirmPayload = {
  ItineraryId: this.itnearyId,
    "AgentMarkup":this.discountAmount,
    "BookItineraryPaxDetail":BookItineraryPaxDetail,
  PhoneNumber: contactInfo.phoneNumber.number || '',
  AlternatePhoneNumber: '',
  Email: contactInfo.email || '',
  PaymentType: 'CC',
  CardType: this.getCardBrand(formValue.CardNumber), // fallback to 'CA' if needed
  CardNumber: formValue.CardNumber,
  CVV: formValue.CVV,
  ExpiryDate: formValue.ExpiryDate,
  BillingPhoneNum: formValue.BillingPhoneNum.number,
  Name: contactInfo.firstName || '', // You can also combine first/last if needed
  Address1: formValue.street,
  Address2: '',
  City: formValue.City,
  ZipCode: formValue.ZipCode,
  Country: formValue.Country,
  State: formValue.State,
};
if(this.flattenedSeatData.length!=0){
 this.flightService
      .flightRequestSeat(paymentPayload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.flightBookingResponse = res?.data;

      // Show toast
      this.toasterService.showSuccess(
        res?.data?.bookingStatus === 'Success'
          ? 'Booking flight successful'
          : 'Booking failed'
      );

      // Continue booking creation if successful
      if (res?.data?.bookingStatus === 'Success') {
        this.createBooking();
      }
              
        },
        error: (err) => {
          this.toasterService.showError(
            err.error.message ||
              'Something went wrong while fetching vendor list!'
          );
        },
      });
}else{

   this.flightService
      .flightConfirmSeat(confirmPayload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
           this.flightBookingResponse = res?.data;

      // Show toast
      this.toasterService.showSuccess(
        res?.data?.bookingStatus === 'Success'
          ? 'Booking flight successful'
          : 'Booking failed'
      );

      // Continue booking creation if successful
      if (res?.data?.bookingStatus === 'Success') {
        this.createBooking();
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
   
      // this._route.navigate(['/flight-booking-confirmation']);
      // Process the payment here
    } else {
      console.log('Form invalid');
      this.checkoutForm.markAllAsTouched();
    }
  }

generatePassword(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
getCurrentDateTime(): string {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = this.padZero(now.getMonth() + 1); // Months are 0-indexed
  const day = this.padZero(now.getDate());

  const hours = this.padZero(now.getHours());
  const minutes = this.padZero(now.getMinutes());
  const seconds = this.padZero(now.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

padZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}



mainbookingTest(){

  const fares = this.getMainDetails?.Fares || [];

const travelerPricings: any = {};

fares.forEach((fare: any) => {
  const paxType = fare.PaxType;

  // Pull included checked bags (if present)
  const includedCheckedBags: any[] = [];
  if (fare?.baggageAllowance) {
    Object.values(fare.baggageAllowance).forEach((segments: any) => {
      includedCheckedBags.push(...segments.filter((bag:any) => bag.type === 'CHECKIN'));
    });
  }

  travelerPricings[paxType] = {
    orgeachtotal: fare?.marketFare + fare?.MarketTaxes,
    eachtotal: fare?.TravellerBaseFare + fare?.TravellerTaxes,
    orgeachbase: fare?.marketFare,
    eachbase: fare?.TravellerBaseFare,
    orgeachtaxes: fare?.MarketTaxes,
    eachtaxes: fare?.TravellerTaxes,
    passengercount: 1, // Default to 1 unless you have actual count elsewhere
    basefare: fare?.TravellerBaseFare,
    total: fare?.TravellerBaseFare + fare?.TravellerTaxes,
    totalbase: fare?.TravellerBaseFare,
    totaltaxes: fare?.TravellerTaxes,
    type: paxType,
    cabin:this.selectedCabin, // Example: You can get from FlightSegment[0]?.CabinClass
    class: fare?.bookingClasses?.split(',')[0] || '',
    includedCheckedBags: includedCheckedBags,
  };
});

console.log(travelerPricings);
const cityPairs = this.getMainDetails?.Citypairs || [];

const itineraries = cityPairs.map((itin: any) => {
  const firstSegment = itin?.FlightSegment?.[0];
  const lastSegment = itin?.FlightSegment?.[itin.FlightSegment.length - 1];

  return {
    duration: itin?.Duration,
    origin_iatacode: firstSegment?.DepartureLocationCode,
    origin_iataname: firstSegment?.DepartureDisplayName,
    origin_departure_terminal: firstSegment?.DepartureTerminalId,
    origin_departure_time: firstSegment?.DepartureDateTime,
    carrierCode: firstSegment?.MarketingAirline,
    aircraft_name: firstSegment?.AirEquipmentType,
    aircraft_code: firstSegment?.MarketingAirline,
    aircraft_number: firstSegment?.FlightNumber,
    origin_city: firstSegment?.OriginAirportName,
    origin_country: '', // if needed, extract from mapping or not available
    origin_country_Code: '',

    destination_iatacode: lastSegment?.ArrivalLocationCode,
    destination_iataname: lastSegment?.DisplayName,
    destination_departure_terminal: lastSegment?.ArrivalTerminalId,
    destination_departure_time: lastSegment?.ArrivalDateTime,
    destination_city: lastSegment?.DestinationAirportName,
    destination_country: '', // not provided
    destination_country_Code: '',

    stopage: itin?.NoOfStops,

    segments: itin?.FlightSegment?.map((seg: any) => ({
      baggageAllowance: seg?.baggageAllowance,
      baggageDesc1: seg?.baggageDesc1,
      baggageDesc2: seg?.baggageDesc2,
      baggageInfoUrl: seg?.baggageInfoUrl,
      departure_iatacode: seg?.DepartureLocationCode,
      departure_terminal: seg?.DepartureTerminalId,
      departure_time: seg?.DepartureDateTime,
      flightlogo: seg?.FlightLogoName,
      arrival_iataCode: seg?.ArrivalLocationCode,
      arrival_terminal: seg?.ArrivalTerminalId,
      arrival_time: seg?.ArrivalDateTime,
      carrierCode: seg?.MarketingAirline,
      carrierName: seg?.MarketingAirlineName,
      duration: seg?.Duration,
      layover: seg?.LayoverTime,
      aircraft_name: seg?.AirEquipmentType,
      aircraft_code: '', // not provided
      aircraft_number: seg?.FlightNumber,
      origin_iataname: seg?.OriginAirportName,
      origin_city: seg?.DepartureDisplayName,
      origin_country: '', // not provided
      origin_country_Code: '',
      destination_iataname: seg?.DestinationAirportName,
      destination_city: seg?.DisplayName,
      destination_country: '', // not provided
      destination_country_code: '',
    }))
  };
});

 console.log("itineraries",itineraries)

const payload={
  offerdetails:JSON.stringify(this.getMainDetails),type: this.getMainDetails?.type||'',
  id: this.getMainDetails?.ItineraryId,
  source: this.getMainDetails?.source||'',
  instantTicketingRequired: this.getMainDetails?.instantTicketingRequired||'',
  nonHomogeneous: this.getMainDetails?.nonHomogeneous||'',
  oneWay: this.getMainDetails?.oneWay||'',
  lastTicketingDate: this.getMainDetails?.lastTicketingDate||'',
  numberOfBookableSeats: this.getMainDetails?.numberOfBookableSeats||'',
  isInternational: this.getMainDetails?.isInternational||0,
  NearLocationItinerary: this.getMainDetails?.NearLocationItinerary?.length>0?'YES':'No',

  price: {
    currency:this.getMainDetails?.Fares[0]?.CurrencyCode,
    currency_symbol: this.getMainDetails?.Fares[0]?.CurrencyCode==='USD'?'$':'€',
    base: this.basefareAmount,
    cabin: this.selectedCabin,
    total: this.basefareAmount,
    grandTotal: this.finalTotal,
    markupgrandTotal: this.discountAmount,
  },
  travelerPricings:travelerPricings,
  

  itineraries: itineraries

}
const mainpayload={
flight_info:JSON.stringify(payload)
}
 this.flightService
      .createFlightbookings(mainpayload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('res', res);
          if(res.States===1){
          this.toasterService.showSuccess(res?.message);
         
               this._route.navigate(['/flight-booking-confirmation'],{
                queryParams:{
                  id:res?.booking?.booking_details?.bookingId
                }
               });
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

  createBooking(){
        if (this.checkoutForm.valid) {
      console.log('Form submitted:', this.checkoutForm.value);
      
        const BookItineraryPaxDetail = this.travelData?.travelers?.map((traveler: any) => {
  return {
    passengerId:0,
    type: traveler.PaxType,
    gender: traveler.gender,
    title: traveler.gender === 'M' ? 'Mr.' : traveler.gender === 'F' ? 'Ms.' : '',
    firstname: traveler.firstName,
    middlename: traveler.middleName,
    lastname: traveler.lastName,
    dob: this.formatDate(traveler.dateOfBirth),
  };
});

  const password = this.generatePassword(8); // Generate 8-character password
const timestamp = Date.now().toString().slice(0, 10); // First 10 digits only
const bookingId = 'A' + timestamp;
  const customerId = parseInt(bookingId.slice(1)); // Remove 'A' to get number
    const formValue = this.checkoutForm.value;
const contactInfo = this.travelData?.contactInfo || {};
const expiry = formValue.ExpiryDate; // e.g., "12/2058"
const [exp_month, exp_year] = expiry.split('/');
 const fares = this.getMainDetails?.Fares || [];

const travelerPricings: any = {};

fares.forEach((fare: any) => {
  const paxType = fare.PaxType;

  // Pull included checked bags (if present)
  const includedCheckedBags: any[] = [];
  if (fare?.baggageAllowance) {
    Object.values(fare.baggageAllowance).forEach((segments: any) => {
      includedCheckedBags.push(...segments.filter((bag:any) => bag.type === 'CHECKIN'));
    });
  }

  travelerPricings[paxType] = {
    orgeachtotal: fare?.marketFare + fare?.MarketTaxes,
    eachtotal: fare?.TravellerBaseFare + fare?.TravellerTaxes,
    orgeachbase: fare?.marketFare,
    eachbase: fare?.TravellerBaseFare,
    orgeachtaxes: fare?.MarketTaxes,
    eachtaxes: fare?.TravellerTaxes,
    passengercount: 1, // Default to 1 unless you have actual count elsewhere
    basefare: fare?.TravellerBaseFare,
    total: fare?.TravellerBaseFare + fare?.TravellerTaxes,
    totalbase: fare?.TravellerBaseFare,
    totaltaxes: fare?.TravellerTaxes,
    type: paxType,
    cabin:this.selectedCabin, // Example: You can get from FlightSegment[0]?.CabinClass
    class: fare?.bookingClasses?.split(',')[0] || '',
    includedCheckedBags: includedCheckedBags,
  };
});

console.log(travelerPricings);
const cityPairs = this.getMainDetails?.Citypairs || [];

const itineraries = cityPairs.map((itin: any) => {
  const firstSegment = itin?.FlightSegment?.[0];
  const lastSegment = itin?.FlightSegment?.[itin.FlightSegment.length - 1];

  return {
    duration: itin?.Duration,
    origin_iatacode: firstSegment?.DepartureLocationCode,
    origin_iataname: firstSegment?.DepartureDisplayName,
    origin_departure_terminal: firstSegment?.DepartureTerminalId,
    origin_departure_time: firstSegment?.DepartureDateTime,
    carrierCode: firstSegment?.MarketingAirline,
    aircraft_name: firstSegment?.AirEquipmentType,
    aircraft_code: firstSegment?.MarketingAirline,
    aircraft_number: firstSegment?.FlightNumber,
    origin_city: firstSegment?.OriginAirportName,
    origin_country: '', // if needed, extract from mapping or not available
    origin_country_Code: '',

    destination_iatacode: lastSegment?.ArrivalLocationCode,
    destination_iataname: lastSegment?.DisplayName,
    destination_departure_terminal: lastSegment?.ArrivalTerminalId,
    destination_departure_time: lastSegment?.ArrivalDateTime,
    destination_city: lastSegment?.DestinationAirportName,
    destination_country: '', // not provided
    destination_country_Code: '',

    stopage: itin?.NoOfStops,

    segments: itin?.FlightSegment?.map((seg: any) => ({
      baggageAllowance: seg?.baggageAllowance,
      baggageDesc1: seg?.baggageDesc1,
      baggageDesc2: seg?.baggageDesc2,
      baggageInfoUrl: seg?.baggageInfoUrl,
      departure_iatacode: seg?.DepartureLocationCode,
      departure_terminal: seg?.DepartureTerminalId,
      departure_time: seg?.DepartureDateTime,
      flightlogo: seg?.FlightLogoName,
      arrival_iataCode: seg?.ArrivalLocationCode,
      arrival_terminal: seg?.ArrivalTerminalId,
      arrival_time: seg?.ArrivalDateTime,
      carrierCode: seg?.MarketingAirline,
      carrierName: seg?.MarketingAirlineName,
      duration: seg?.Duration,
      layover: seg?.LayoverTime,
      aircraft_name: seg?.AirEquipmentType,
      aircraft_code: '', // not provided
      aircraft_number: seg?.FlightNumber,
      origin_iataname: seg?.OriginAirportName,
      origin_city: seg?.DepartureDisplayName,
      origin_country: '', // not provided
      origin_country_Code: '',
      destination_iataname: seg?.DestinationAirportName,
      destination_city: seg?.DisplayName,
      destination_country: '', // not provided
      destination_country_code: '',
    }))
  };
});

 console.log("itineraries",itineraries)

const mainPayload={
  offerdetails:JSON.stringify(this.getMainDetails),type: this.getMainDetails?.type||'',
  id: this.getMainDetails?.ItineraryId,
  source: this.getMainDetails?.source||'',
  instantTicketingRequired: this.getMainDetails?.instantTicketingRequired||'',
  nonHomogeneous: this.getMainDetails?.nonHomogeneous||'',
  oneWay: this.getMainDetails?.oneWay||'',
  lastTicketingDate: this.getMainDetails?.lastTicketingDate||'',
  numberOfBookableSeats: this.getMainDetails?.numberOfBookableSeats||'',
  isInternational: this.getMainDetails?.isInternational||0,
  NearLocationItinerary: this.getMainDetails?.NearLocationItinerary?.length>0?'YES':'No',

  price: {
    currency:this.getMainDetails?.Fares[0]?.CurrencyCode,
    currency_symbol: this.getMainDetails?.Fares[0]?.CurrencyCode==='USD'?'$':'€',
    base: this.basefareAmount,
    cabin: this.selectedCabin,
    total: this.basefareAmount,
    grandTotal: this.finalTotal,
    markupgrandTotal: this.discountAmount,
  },
  travelerPricings:travelerPricings,
  

  itineraries: itineraries

}

    const payload={
    "bookingId": bookingId,
    "customer_name": contactInfo.firstName || '',
    "customer_email":contactInfo.email || '',
    "customer_phone":  contactInfo.phoneNumber.number || '',
    "customer_alt_phone": "",
    "customer_id":customerId,
    "password": password,
    "referral_id": "",
    "booking_source": "Mondee",
    "descriptor": "Trippro",
    "vendor": "newsite.theinfinitytravel.com",
    "gateway": "Mondee",
    "gds_pnr": "",
    "miles_pnr": "",
    "airline1": this.getFlights,
    "airline1pnr":this.flightBookingResponse.PNR || '',
    "airline2": "",
    "airline2pnr": "",
    "airline3": "",
    "airline3pnr": "",
    "card_type": this.getCardBrand(formValue.CardNumber),
    "name_oncard": formValue.cardHolder,
    "cardno":  formValue.CardNumber,
    "exp_month": exp_month,
    "exp_year":exp_year,
    "cvv":formValue.CVV,
    "billing_address":formValue.street,
    "street_number": "",
    "locality": "",
    "billing_city": formValue.city,
    "billing_state": formValue.State,
    "billing_zip": formValue.ZipCode,
    "country": formValue.Country,
    "trip": "",
    "trip_type": "",
    "currency": "USD",
    "netcost": this.basefareAmount,
    "tax":this.taxAmount,
    "subtotal": this.basefareAmount,
    "actual_cost": this.basefareAmount,
    "actual_mco":this.markup,
    "noof_traveller": 1,
    "total_charged": this.totalAmount,
    "airline_charged": 0,
    "booking_date": this.getCurrentDateTime(),
    "payment_status": "",
    "payment_status_changed_by": 0,
    "work_status": "",
    "work_status_changed_by": 0,
    "passengers": BookItineraryPaxDetail,
    "flight_details": this.flightDetails,
    "payment_info": {
        "tripId": this.flightBookingResponse.tripId,
        "productId": this.flightBookingResponse.productId,
        "bookingStatus": this.flightBookingResponse.bookingStatus,
        "multiItinInSingleBooking": "",
        "itinGuid": this.flightBookingResponse.productId,
        "PNR": this.flightBookingResponse.PNR || '',
        "ReferenceNumber": this.flightBookingResponse.ReferenceNumber ,
        "origin": this.flightBookingResponse.origin ,
        "destination": this.flightBookingResponse.destination ,
        "flight_info":JSON.stringify(mainPayload)
    }

  }

   this.flightService
      .createFlightbookings(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('res', res);
          if(res.status===1){
          this.toasterService.showSuccess(res?.message);
         
               this._route.navigate(['/flight-booking-confirmation'],{
                queryParams:{
                  id:res?.booking?.booking_details?.bookingId
                }
               });
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
}
