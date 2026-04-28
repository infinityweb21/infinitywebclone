import { Component, DestroyRef, inject } from '@angular/core';
import { SvgIcons } from '../../../../../../shared/svg-icons';
import { FlightService } from '../../../../../../services/flight/flight.service';
import { TosterService } from '../../../../../../services/common/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchService } from '../../../../../../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-ticket',
  imports: [CommonModule],
  templateUrl: './confirm-ticket.component.html',
  styleUrl: './confirm-ticket.component.scss',
})
export class ConfirmTicketComponent {
  protected icons = inject(SvgIcons);
  private searchService: SearchService = inject(SearchService);
  pnr:any='';
  flightTickets = [
    {
      airline: 'Air India',
      cabinClass: 'Basic economy',
      route: 'CCU - DEL',
      duration: '2h 35m',
      stop: 'Direct',
      departure: {
        date: 'Monday, May 26, 08.00 AM',
        airport: 'Netaji Subhas Chandra Bose International Airport',
        code: 'CCU',
      },
      arrival: {
        date: 'Monday, May 26, 10.30 AM',
        airport: 'Indira Gandhi International Airport',
        code: 'IGI',
      },
      bookingId: 'A135269819815',
      pnr: 'DLIQXJ',
    },
    {
      airline: 'Air India',
      cabinClass: 'Basic economy',
      route: 'CCU - DEL',
      duration: '2h 35m',
      stop: 'Direct',
      departure: {
        date: 'Monday, May 26, 08.00 AM',
        airport: 'Netaji Subhas Chandra Bose International Airport',
        code: 'CCU',
      },
      arrival: {
        date: 'Monday, May 26, 10.30 AM',
        airport: 'Indira Gandhi International Airport',
        code: 'IGI',
      },
      bookingId: 'A135269819815',
      pnr: 'DLIQXJ',
    },
  ];

  travelers = [
    {
      name: 'Dona Dey',
      dob: '30-10-1999',
      gender: 'Female',
      ageGroup: 'Adult',
      seat: '10A',
    },
    {
      name: 'Rohit Dey',
      dob: '30-10-1999',
      gender: 'Male',
      ageGroup: 'Adult',
      seat: '10B',
    },
  ];
bookingId:any='';
getTickets:any='';
departureCode:any='';
arrivalCode:any='';
getTravelData:any='';
repriceData:any='';
flight = {
  departureAirport: 'Logan International Airport',
  departureCode: 'BOS',
  arrivalAirport: 'Istanbul New Airport',
  arrivalCode: 'IST',
  pnr: 'FNHGUV',
  bookingId: 'A1753908739',
  baseFare: 187.00,
  taxes: 261.70,
  total: 493.57,
  passenger: {
    name: 'Mrs. Tugba Demirtas',
    dob: '1989-03-04',
    nationality: '----'
  },
  segments: [
    {
      airlineLogo: 'path_to_logo/etihad.png',
      airlineName: 'Etihad Airways',
      class: 'Economy',
      flightNumber: '8',
      departureCode: 'BOS',
      departureTime: '2025-08-06T16:30:00',
      departureDate: '2025-08-06',
      departureAirport: 'Logan International Airport',
      arrivalCode: 'AUH',
      arrivalTime: '2025-08-07T12:55:00',
      arrivalDate: '2025-08-07',
      arrivalAirport: 'Abu Dhabi International Airport',
      passengerName: 'Mrs. Tugba Demirtas'
    },
    {
      airlineLogo: 'path_to_logo/etihad.png',
      airlineName: 'Etihad Airways',
      class: 'Economy',
      flightNumber: '543',
      departureCode: 'AUH',
      departureTime: '2025-08-08T02:15:00',
      departureDate: '2025-08-08',
      departureAirport: 'Abu Dhabi International Airport',
      arrivalCode: 'IST',
      arrivalTime: '2025-08-08T06:15:00',
      arrivalDate: '2025-08-08',
      arrivalAirport: 'Istanbul New Airport',
      passengerName: 'Mrs. Tugba Demirtas'
    }
  ]
};

constructor(
    private flightService: FlightService,
    private toasterService: TosterService,
    private route: ActivatedRoute,
    private router: Router,
    private destroyRef:DestroyRef
  ) {
    const pnr=localStorage.getItem('pnr');
    this.pnr=pnr;
    this.route.queryParams.subscribe(({ id }) => {
      if (id) {
        this.bookingId = id;
        console.log('bookingId :', id);
      }
    });
   this.searchService.searchData$.subscribe((searchData) => {
  console.log('Received Flight Data:', searchData);
  if (searchData && searchData.OriginDestination?.length) {
    let departureCode = '';
    let arrivalCode = '';

    if (searchData.tripType === 'multicity') {
      // For multicity: departure from 0th index, arrival from last index
      departureCode = searchData.OriginDestination[0]?.DepartureLocationCode || '';
      arrivalCode = searchData.OriginDestination[searchData.OriginDestination.length - 1]?.ArrivalLocationCode || '';
    } else {
      // For one-way or roundtrip: use 0th index for both
      departureCode = searchData.OriginDestination[0]?.DepartureLocationCode || '';
      arrivalCode = searchData.OriginDestination[0]?.ArrivalLocationCode || '';
    }

    console.log('Departure Location Code:', departureCode);
    console.log('Arrival Location Code:', arrivalCode);

    // You can store/use these codes as needed
    this.departureCode = departureCode;
    this.arrivalCode = arrivalCode;
  }
});

}
  ngOnInit() {
this.getTicket();
this.getAllData();
  }
  getAllData(){
        const getReprice=this.flightService.getRepriceData();
this.repriceData=getReprice?.data?.flight;
console.log("getReprice?.data?.flight",this.repriceData?.Citypairs
[0])
    const travelData=this.flightService.getTravelData();
this.getTravelData=travelData?.travelers;

  }
  getTicket(){
     this.flightService.getFlightTicket(this.bookingId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log("res", res);
        this.getTickets = res?.pdfurl;

      },
      error: (err) => {
        this.toasterService.showError(err.error.message || 'Something went wrong while fetching vendor list!')
      }
    })
    
  }
  downloadTicket() {
  const pdfUrl = this.getTickets // Replace with your actual PDF URL
  const fileName = 'ticket.pdf';

  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = fileName;
  link.target = '_blank'; // optional: opens in new tab if supported
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
}