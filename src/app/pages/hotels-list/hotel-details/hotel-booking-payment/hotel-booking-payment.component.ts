
import { ActivatedRoute, Router } from '@angular/router';
import { DatePicker } from 'primeng/datepicker';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { SearchService } from '../../../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotelService } from '../../../../services/hotel/hotel.service';
import { RatingModule } from 'primeng/rating';
import { TosterService } from '../../../../services/common/toaster.service'

import { SearchCountryField, CountryISO, PhoneNumberFormat, NgxIntlTelInputComponent, NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@Component({
  selector: 'app-hotel-booking-payment',
  imports: [DatePicker,FormsModule,ReactiveFormsModule,NgFor,NgIf,RatingModule,DatePipe,CurrencyPipe,NgxIntlTelInputModule],
  templateUrl: './hotel-booking-payment.component.html',
  styleUrl: './hotel-booking-payment.component.scss'
})
export class HotelBookingPaymentComponent {
  private selectedRateId:string='';
  private searchRequestId:string='';
  private hotelId:string='';
  private roomId:string=''
  bookingForm: FormGroup;
  private searchService : SearchService = inject(SearchService)
  private toasterService:TosterService = inject(TosterService)
  private hotelService : HotelService = inject(HotelService)
  private destroyRef : DestroyRef =inject(DestroyRef)
  	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor(private fb: FormBuilder) {
     this.bookingForm = this.fb.group({
      travelers: this.fb.array([this.createTraveler()])
    });
  }
  roomDetails:any
  rateDetails:any
  hotelDetails:any
  rooms:any[]=[]
  searchData:any
  paymentForm!: FormGroup;
  billingForm!:FormGroup
  private activatedRoute:ActivatedRoute=inject(ActivatedRoute)
  router:Router=inject(Router)

  bookingDetails:any
  ngOnInit():void{
   this.activatedRoute.queryParams.subscribe(params => {
    console.log('params',params);
    this.selectedRateId=params['rateId']
    this.searchRequestId=params['requestId']
    this.hotelId = params['hotelId'];
    this.roomId = params['roomId']
    
      
    })
     this.searchService.hotelSearchData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      console.log("received data -- booking details", data);
     this.searchData=data
      // Update rooms FormArray
     
      // this.hotelForm.patchValue(data);
    });
    this.hotelService.selectedRoom$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data)=>{

    console.log("booking room details",data)
      this.roomDetails=data?.selectedRoom
      this.rateDetails=data?.selectedRate
      this.hotelDetails=data?.hotelDetails

  })
   this.paymentForm = this.fb.group({
    nameOnCard: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [undefined, Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(13)]],
    expDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/)]], // MM/YYYY
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
  });

  this.billingForm = this.fb.group({
    address:['',Validators.required],
    area:[''],
    state:['',Validators.required],
    street:[''],
    city:['',Validators.required],
    zipCode:['',[Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    country:['',Validators.required]
  })


  }
   createTraveler(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required]
    });
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
confirmAndBook() {
  console.log(this.bookingForm,this.paymentForm);
   
  if (this.bookingForm.invalid || this.paymentForm.invalid || this.billingForm.invalid) {
    this.bookingForm.markAllAsTouched();
    this.paymentForm.markAllAsTouched();
    this.billingForm.markAllAsTouched();
     this.validateAllFormFields(this.bookingForm);
    return;
  }

  const travelersFormArray = this.bookingForm.get('travelers') as FormArray;
  const travelers = travelersFormArray.value;

  const guestDetails = travelers.map((traveler: any, index: number) => ({
    firstName: traveler.firstName,
    middleName: '', // you can extend your form to include this if needed
    lastName: traveler.lastName,
    gender: this.capitalizeFirstLetter(traveler.gender),
    type: 'Adult', // hardcoded as per your example
    phoneNumber: this.paymentForm.value.phone.number, // assuming same phone for all
    email: traveler.email,
    primaryTraveler: index === 0 // first traveler is primary
  }));

  const billingDetails = [
    {
      paymentType: 'CK', // can change this dynamically if needed
      firstName: this.paymentForm.value.nameOnCard.split(' ')[0] || '',
      lastName: this.paymentForm.value.nameOnCard.split(' ')[1] || '',
      emailId: this.paymentForm.value.email,
      phone: {
        countryCode:this.paymentForm.value.phone.dialCode,
        areaCode:"313",
        number:this.paymentForm.value.phone.number
      },
       creditCard: {
                type: this.getCardBrand(this.paymentForm.value.cardNumber),
                creditCardNumber: this.paymentForm.value.cardNumber,
                securityCode: this.paymentForm.value.cvv,
                expMonth: this.paymentForm.value.expDate.split("/")[0],
                expYear: this.paymentForm.value.expDate.split("/")[1]
            },
    }
  ];
  const rooms=[{
    roomId:this.roomDetails?.roomId,
    rateId:this.rateDetails?.rateId,
    guestDetails

  }]
  this.rooms=rooms
  const loyaltyDetails={
     name: "",
        loyaltyId: ""
  }


  const finalPayload = {
    searchRequestId:this.searchRequestId,
    propertyId:this.hotelId,
    rateId:this.rateDetails.rateId,
    roomId:this.roomDetails?.roomId,
    guestDetails,
    billingDetails,
    rooms,
    loyaltyDetails,
    specialRequirements:"",
    checkoutFare:this.rateDetails?.perNightTotalFare * this.numberOfNights * this.rooms.length

  };

  console.log('Final JSON Payload:', finalPayload);

//  const bookingRes={
//     "searchRequestId": "0ff7c282-4e13-4bc7-bc32-3707a439117e",
//     "confirmationNumber": "10017431388",
//     "referenceNumber": "68665648ecbc3",
//     "hotelName": "The Maureen",
//     "hotelPhoneNumber": "",
//     "hotelAddress": {
//         "id": null,
//         "line1": "Rgm 23/23, Kazi Nazrul Islam Avenue, Vip Road, Kolkata 700059",
//         "line2": null,
//         "city": "Kolkata",
//         "state": null,
//         "zipcode": "700059",
//         "latitude": null,
//         "longitude": null,
//         "country": "IN",
//         "countryCode": null
//     },
//     "bookingSuccess": true,
//     "errorList": null,
//     "pnr": "10017431388",
//     "tripId": "2000113087",
//     "hotelFax": null,
//     "hotelEmail": "",
//     "roomInfo": [
//         {
//             "roomNumber": 1,
//             "rateId": "MGZmN2MyODItNGUxMy00YmM3LWJjMzItMzcwN2E0MzkxMTdlOjotMTU3MjM5NDQ6Oi05MDE4Mzg3MzA6Oi1NR1ptTjJNeU9ESXROR1V4TXkwMFltTTNMV0pqTXpJdE16Y3dOMkUwTXpreE1UZGxPam90TVRVM01qTTVORFE2T2kwNU1ERTRNemczTXpBNk9pMHlNREkxTFRFeExURXlPam95TURJMUxURXhMVEV6T2pvNU1ERTRNemczTXpBNk9qazFNams1T1RKZlgwOVVVbXhhVkdkNFRXcHJkRTU2U1ROTlF6RnFUa1JLYWt4WFVtMU9hbFYwVFcxRmVVNVVTVEpQVkdzd1QxUlpNMDlxVFhwTlp6MDlPam8zTURFMU5URTNNak02T2pkaVpqUXlZbU5pTFRZek5EY3RORGhtTkMwNVpUVTNMV0k1WVdZMU0yTmtaR0kyWXpvNkxRPT06Oi0=",
//             "roomId": "901838730",
//             "roomDesc": "Providing free toiletries, this double room includes a private bathroom with a shower, a hairdryer and slippers. The double room provides air conditioning, a mini-bar, a tea and coffee maker, a wardrobe, as well as a flat-screen TV with cable channels. The unit offers 1 bed.",
//             "roomType": "Queen Room",
//             "confirmationNumber": "10017431388",
//             "noOfChildren": 0,
//             "noOfAdults": 2,
//             "totalNumOfNights": 1,
//             "roomFareTotal": 49.68,
//             "roomBasePriceTotal": 44.25,
//             "roomTaxesTotal": 5.42
//         }
//     ]
// }
// this.getBookingDetails(bookingRes.tripId,bookingRes)
  this.hotelService.hotelBooking(finalPayload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    next:(res)=>{
      if(res?.data?.bookingSuccess){

        this.getBookingDetails(res?.data?.tripId,res?.data)
        //  this.toasterService.showSuccess("booking confirmed")

        //  window.scrollTo({ top: 0, behavior: 'smooth' });
      }else{
        this.toasterService.showError("something went wrong please try again later")
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
     
    },
    error:(err)=>{
        this.toasterService.showError("something went wrong please try again later")
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  })

  // You can now send this `finalPayload` to your backend API
}
getBookingDetails(tripId:string,bookingRes:any):void{
 
  this.hotelService.getBookingDetails(tripId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    next:(res)=>{
      this.bookingDetails=res?.data
      this.createBooking(res?.data,bookingRes)
    },
    error:(err)=>{
      this.toasterService.showError("something went wrong while fetching booking details")
    }
  })
}
generatePassword(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}
createBooking(bookingDetails:any,bookingRes:any){
 
const bookingId = 'H' + Math.floor(Date.now() / 1000);
const password = this.generatePassword(8);

  const jsonBody={
    "id": "",
    reference_id:bookingRes?.referenceNumber,
    name: bookingDetails?.hotelName,
    address: bookingDetails?.address,
    hotel_phone: bookingDetails?.hotelPhoneNumber,
    hotel_email: bookingDetails?.hotelPhoneNumber,
    room_type: bookingDetails?.roomInfo?.[0]?.roomType,
    booking_source: "Mondee",
    booking_status: "Hotel Booking",
    booking_engine: "Mondee",
    descriptor: "Infinity Travel",
    vendor: "infinitytravelmate.com (Infinity Travels)",
    no_of_adult: bookingDetails?.roomInfo?.[0]?.noOfAdults,
    no_of_child: bookingDetails?.roomInfo?.[0]?.noOfChildren,
    no_of_bed: 1,
    no_of_bedroom: 1,
    checkin_date: this.searchData?.checkIn,
    checkin_time: bookingDetails?.checkInTime,
    checkout_date: bookingDetails?.checkOutTime,
    checkout_time:  this.searchData?.checkOut,
    contact_person: this.paymentForm.value.nameOnCard,
    contact_personemail: this.paymentForm.value.email,
    contact_personphone: this.paymentForm.value.phone.number,
    country_code: this.paymentForm.value.phone.dialCode,
    card_type:this.getCardBrand(this.paymentForm.value.cardNumber),
    name_oncard: this.paymentForm.value.nameOnCard,
    cardno: this.paymentForm.value.cardNumber,
    exp_month: this.paymentForm.value.expDate.split("/")[0],
    exp_year: this.paymentForm.value.expDate.split("/")[1],
    cvv: this.paymentForm.value.cvv,
    billing_address: this.billingForm.value.address,
    street_number: this.billingForm.value.street || this.billingForm.value.address,
    addtional_policies: this.hotelDetails?.hotelPolicies?.know_before_you_go||'',
    locality: this.billingForm.value.area || this.billingForm.value.city,
    billing_city: this.billingForm.value.city,
    billing_state: this.billingForm.value.state,
    billing_zip: this.billingForm.value.zipCode,
    country: this.billingForm.value.country,
    currency: this.rateDetails?.currencyCode,
    netcost: this.rateDetails?.perNightTotalFare * this.numberOfNights * this.rooms.length,
    tax: this.rateDetails?.perNightTaxesAndFees * this.numberOfNights * this.rooms.length,
    subtotal: this.rateDetails?.perNightBaseFare * this.numberOfNights * this.rooms.length,
    total_charged: this.rateDetails?.perNightTotalFare * this.numberOfNights * this.rooms.length,
    actual_cost: this.rateDetails?.perNightTotalFare * this.numberOfNights * this.rooms.length,
    actual_mco: this.rateDetails?.perNightTaxesAndFees * this.numberOfNights * this.rooms.length,
    booking_id: bookingId,
    transaction_type: "Hotel Booking",
    guest_details: bookingDetails?.guestInfo,
    tripId: bookingDetails?.tripId,
    productId:bookingRes?.referenceNumber,
    bookingStatus: bookingDetails?.bookingStatus,
    multiItinInSingleBooking: 0,
    itinGuid: bookingRes?.searchRequestId,
    PNR: bookingDetails?.pnr,
    ReferenceNumber: bookingRes?.referenceNumber,
    origin: "",
    destination: this.searchData?.airportCode?.cityid,
    hotel_aminities: JSON.stringify(this.hotelDetails?.facilities),
    booking_details: JSON.stringify(bookingRes),
    traveller_password:password
}

  this.hotelService.createBooking(jsonBody).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    next:(res)=>{
      // redircet to thank you page
      this.router.navigate(['/hotel-booking-ticket',bookingId])
     
    }
  })

}

validateAllFormFields(formGroup: FormGroup | FormArray) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup || control instanceof FormArray) {
      this.validateAllFormFields(control);
    }
  });
}
capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
get numberOfNights(): number {
  const checkIn = this.searchData?.checkIn;
  const checkOut = this.searchData?.checkOut;

  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = timeDiff / (1000 * 3600 * 24);

    return diffDays > 0 ? diffDays : 0;
  }

  return 0;
}
  get travelers(): FormArray {
    return this.bookingForm.get('travelers') as FormArray;
  }

  addTraveler(): void {
    this.travelers.push(this.createTraveler());
  }

  removeTraveler(index: number): void {
    this.travelers.removeAt(index);
  }

  submit(): void {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
