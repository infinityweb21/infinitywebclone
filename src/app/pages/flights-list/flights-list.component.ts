import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe, DecimalPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { SvgIcons } from '../../shared/svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { FlatpickrDirective } from '../../directives/flatpickr.directive';
import { SliderModule } from 'primeng/slider';
import { FlightService } from '../../services/flight/flight.service';
import { TosterService } from '../../services/common/toaster.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AutoCompleteModule } from 'primeng/autocomplete';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { FlightFilters, FlightFilterService } from '../../services/flight/flight-filter.service';
import { Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

Swiper.use([Navigation]);

@Component({
  selector: 'app-flights-list',
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, DrawerModule, FlatpickrDirective, SliderModule, AutoCompleteModule, CommonModule],
  templateUrl: './flights-list.component.html',
  styleUrl: './flights-list.component.scss',
})
export class FlightsListComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;


  @ViewChild('tableWrapper') tableWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('drawerRef') drawerRef!: Drawer;
  private destroyRef: DestroyRef = inject(DestroyRef);
  submitted: boolean = false;
  private searchService: SearchService = inject(SearchService);
  protected icons: SvgIcons = inject(SvgIcons);
  private router: Router = inject(Router);

  selectedTab: string = 'all';
  scrollAmount: number = 200;
  isScrollLeftDisabled: boolean = true;
  isScrollRightDisabled: boolean = false;
  showDetailsMap: { [key: string]: boolean } = {};
  lowestPrice: number = 0;
  highestPrice: number = 100000;
  sliderValue: number[] = [0, 100000];
  visible: boolean = false;
  inputValue: string = '';
  showDropdown: boolean = false;
  dropdownOpen: boolean = false;

  selectedAdults: number = 1;
  selectedChildren: number = 0;
  selectedInfants: number = 0;

  selectedCabin = { name: 'Economy', value: 'E' };
  filters!: FlightFilters;
  private filterSub!: Subscription;
  stopOptions = [
    { value: 0, key: 'stopes_0', label: 'Direct' },
    { value: 1, key: 'stopes_1', label: '1 stop' },
    { value: 2, key: 'stopes_more', label: '1+ stop' }
  ];
  classMap: { [key: string]: string } = {
    E: 'Economy',
    F: 'First',
    B: 'Business',
    P: 'Premium Economy'
  };
  cabinOptions = [
    { name: 'Economy', value: 'E' },
    { name: 'First', value: 'F' },
    { name: 'Business', value: 'B' },
    { name: 'Premium Economy', value: 'P' },
  ];


  dates = [
    { date: 'May 9', fare: 13676.45 },
    { date: 'May 10', fare: 13676.45 },
    { date: 'May 11', fare: 13676.45 },
    { date: 'May 12', fare: 13676.45 },
    { date: 'May 13', fare: 13676.45 },
    { date: 'May 14', fare: 13676.45 },
    { date: 'May 15', fare: 13676.45 },
    { date: 'Calendar', fare: 13676.45 },
  ];

  flightCards = [
    {
      price: 13676.45,
      outbound: {
        date: 'Tue, Jun 03',
        airline: 'Air India',
        logo: 'assets/images/flight-details/logo1.png',
        departTime: '12:00pm',
        departCode: 'DEL',
        stops: '1 stop, 2h 15m',
        arriveTime: '02:40pm',
        arriveCode: 'CCU',
      },
      return: {
        date: 'Tue, Jun 05',
        airline: 'Air India',
        logo: 'assets/images/flight-details/logo1.png',
        departTime: '12:00am',
        departCode: 'CCU',
        stops: '1 stop, 2h 15m',
        arriveTime: '02:40am',
        arriveCode: 'DEL',
      },
      alternateDates: 'Mon, Jun 02 - Sat, Jun 07',
    },
    {
      price: 13676.45,
      outbound: {
        date: 'Tue, Jun 03',
        airline: 'Air India',
        logo: 'assets/images/flight-details/logo1.png',
        departTime: '12:00pm',
        departCode: 'DEL',
        stops: '1 stop, 2h 15m',
        arriveTime: '02:40pm',
        arriveCode: 'CCU',
      },
      return: {
        date: 'Tue, Jun 05',
        airline: 'Air India',
        logo: 'assets/images/flight-details/logo1.png',
        departTime: '12:00am',
        departCode: 'CCU',
        stops: '1 stop, 2h 15m',
        arriveTime: '02:40am',
        arriveCode: 'DEL',
      },
      alternateDates: 'Mon, Jun 02 - Sat, Jun 07',
    },
    // Add more cards as needed
  ];
  flights = [
    {
      id: 1,
      price: 13676.45,
      segments: [
        {
          type: 'Departure',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
        {
          type: 'Return',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
      ],
      details: [
        {
          type: 'Depart',
          date: 'Mon, May 26',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
        {
          type: 'Return',
          date: 'Mon, Jun 02',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
      ],
    },
    {
      id: 2,
      price: 14676.45,
      segments: [
        {
          type: 'Departure',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
        {
          type: 'Return',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
      ],
      details: [
        {
          type: 'Depart',
          date: 'Mon, May 26',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
        {
          type: 'Return',
          date: 'Mon, Jun 02',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
      ],
    },
    {
      id: 3,
      price: 15676.45,
      segments: [
        {
          type: 'Departure',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
        {
          type: 'Return',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
      ],
      details: [
        {
          type: 'Depart',
          date: 'Mon, May 26',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
        {
          type: 'Return',
          date: 'Mon, Jun 02',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
      ],
    },
    {
      id: 4,
      price: 16676.45,
      segments: [
        {
          type: 'Departure',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
        {
          type: 'Return',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
      ],
      details: [
        {
          type: 'Depart',
          date: 'Mon, May 26',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
        {
          type: 'Return',
          date: 'Mon, Jun 02',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
      ],
    },
    {
      id: 5,
      price: 17676.45,
      segments: [
        {
          type: 'Departure',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
        {
          type: 'Return',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
      ],
      details: [
        {
          type: 'Depart',
          date: 'Mon, May 26',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
        {
          type: 'Return',
          date: 'Mon, Jun 02',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
      ],
    },
    {
      id: 6,
      price: 18676.45,
      segments: [
        {
          type: 'Departure',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
        {
          type: 'Return',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
      ],
      details: [
        {
          type: 'Depart',
          date: 'Mon, May 26',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
        {
          type: 'Return',
          date: 'Mon, Jun 02',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
      ],
    },
    {
      id: 7,
      price: 19676.45,
      segments: [
        {
          type: 'Departure',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
        {
          type: 'Return',
          airline: 'Air India',
          logo: 'assets/images/flight-details/logo1.png',
          departTime: '12:00pm',
          departCode: 'DEL',
          arriveTime: '2:40pm',
          arriveCode: 'CCU',
          duration: '2h35m',
          stops: '1 stop',
        },
      ],
      details: [
        {
          type: 'Depart',
          date: 'Mon, May 26',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
        {
          type: 'Return',
          date: 'Mon, Jun 02',
          airline: 'Air India',
          flightNo: 'Flight 2727',
          aircraft: '32N',
          stops: '1 stop',
          duration: '2h 35m',
          depart: {
            date: 'Mon, May 26',
            time: '12:00 PM',
            airport: 'New Delhi IGI, DEL',
          },
          arrive: {
            date: 'Tue, May 27',
            time: '02:40 PM',
            airport: 'Kolkata, CCU',
          },
          service: {
            class: 'Economy (H)',
            airbus: 'A350-900',
            meal: 'Meal',
            seat: 'Check-in required',
          },
        },
      ],
    },
  ];
  visibleAirlineCount = 5;
  getFlightsAdvanced: any = '';
  getFlightAllDetails: any[] = [];
  getMainDetails: any[] = [];
  getNearbyDetails: any[] = [];

  adultsList = Array.from({ length: 9 }, (_, i) => i + 1);
  childrenList = Array.from({ length: 8 }, (_, i) => i + 1);
  infantsList = Array.from({ length: 5 }, (_, i) => i);
  departureAirports: any[] = [];
  getAllCarrierWiseFares: any[] = [];
  imageUrl: string = 'https://images.trippro.com/AirlineImages/AirLine/GDS/images/';
  flightForm: FormGroup
  swiper!: Swiper;
  showAllAirlines = false;
  showArrivalTimeFilters: boolean = false;
  showReturnArrivalTimeFilters: boolean = false;

  priceData = [
    { date: 'May 9', value: '$13,676.45' },
    { date: 'May 10', value: '$14,000.00' },
    { date: 'May 11', value: '$13,800.00' },
    { date: 'May 12', value: '$14,200.00' },
    { date: 'May 13', value: '$13,900.00' },
    { date: 'May 14', value: '$14,100.00' },
    { date: 'May 15', value: '$13,700.00' },
    { date: 'May 16', value: '$14,300.00' },
    { date: 'May 17', value: '$13,950.00' },
    { date: 'May 18', value: '$14,250.00' },
    { date: 'May 19', value: '$13,850.00' },
    { date: 'May 20', value: '$14,150.00' },
    { date: 'May 21', value: '$13,750.00' },
    // Add more data here
  ];

  constructor(private fb: FormBuilder, private flightService: FlightService, private toasterService: TosterService, private filterService: FlightFilterService,
        private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {
    this.flightForm = this.fb.group({
      tripType: ['roundtrip'],
      departureAirport: [''],
      arrivalAirport: [''],
      departureDate: [''],
      arrivalDate: [''],
      directFlightsOnly: [false],
      passengers: this.fb.group({
        adults: [this.selectedAdults],
        children: [this.selectedChildren],
        infants: [this.selectedInfants],
        cabin: [{ name: 'Economy', value: 'E' }],
      }),
      multiCitySegments: this.fb.array([]),
    });
    this.updateInput();
    this.handleTripTypeValidation();
  }

  ngAfterViewInit(): void {
    this.updateScrollButtons();

    this.swiper = new Swiper('.priceMonthCardSlider', {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: '.price-slider-arrow-next',
        prevEl: '.price-slider-arrow-prev',
      },
      loop: false,
      breakpoints: {
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 7,
        },
      },
    });
  }


  ngOnInit() {

     const metaTitle = this.route.snapshot.data['metaTitle'];
    const metaDescription = this.route.snapshot.data['metaDescription'];

    // Set title
    if (metaTitle) {
      this.title.setTitle(metaTitle);
    }

    // Set meta description
    if (metaDescription) {
      this.meta.updateTag({ name: 'description', content: metaDescription });
    }

    this.filterSub = this.filterService.filters$.subscribe(f => {
      this.filters = f;
      console.log('Updated Filters:', f);
    });

    this.searchService.searchData$.subscribe((searchData) => {
      console.log('Received Flight Data:', searchData);
      if (searchData) {
        this.selectedAdults = searchData?.NoOfAdults ?? 1;
        this.selectedChildren = searchData?.NoOfChildren ?? 0;
        this.selectedInfants = searchData?.NoOfInfants ?? 0;
        this.selectedCabin = searchData?.OriginDestination[0].CabinClass || { name: 'Economy', value: 'E' };

        this.flightForm.patchValue({


          tripType: searchData?.tripType || 'roundtrip',
          departureAirport: searchData?.OriginDestination[0]?.DepartureLocationCode || '',
          arrivalAirport: searchData?.OriginDestination[0]?.ArrivalLocationCode || '',
          departureDate: searchData?.OriginDestination[0]?.DepartureTime || '',
          arrivalDate: searchData?.OriginDestination[1]?.DepartureTime || '',
          directFlightsOnly: searchData?.directFlightsOnly || false,
          passengers: {
            adults: this.selectedAdults,
            children: this.selectedChildren,
            infants: this.selectedInfants,
            cabin: searchData?.OriginDestination[0].CabinClass,
          }
        });

   if (searchData.tripType == 'multicity') {
  console.warn("sdjkfiugsdi gsuihsdh")
  const segmentsArray = this.flightForm.get('multiCitySegments') as FormArray;
  segmentsArray.clear();

  // Skip first segment [0], start from index 1
  searchData.OriginDestination.slice(1).forEach((segment: any) => {
    segmentsArray.push(new FormGroup({
      departure: new FormControl(segment?.DepartureLocationCode),
      arrival: new FormControl(segment?.ArrivalLocationCode),
      departureDate: new FormControl(segment?.DepartureTime)
    }));
  });
}

        this.updateInput();
        // Use searchData to fetch or filter flights
      } else {
        // Optionally handle empty state (e.g., redirect back or show message)
      }
    });
    const savepayload = this.sendPayload();
    this.getFlights(savepayload);
    this.flightService.clearTravelData();
    this.flightService.clearseatData();
    this.flightService.clearRepriceData();
  }
  get f() { return this.flightForm.controls; }
  getFlights(payload: any) {


    this.flightService.getflightList(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log("res", res);
        this.getMainDetails = res?.data?.FlightItinerary || [];
        this.getNearbyDetails = res?.data?.NearLocationItinerary || [];
        this.getAllCarrierWiseFares = this.buildCarrierWiseFares(res?.data?.FlightItinerary);
        console.log("✅ Carrier-wise Fare Output:", this.getAllCarrierWiseFares);
        this.applyFilter();
      },
      error: (err) => {
         this.getMainDetails=[];
         this.getNearbyDetails=[];
         this.getAllCarrierWiseFares=[];
        this.toasterService.showError(err.error.message || 'Something went wrong while fetching vendor list!')
      }
    })
  }


  buildCarrierWiseFares(itineraries: any[]): any[] {
    const carriersMap = new Map<string, {
      image: string;
      stopFares: {
        stopes_0: number;
        stopes_1: number;
        stopes_more: number;
      };
    }>();

    let minFare = Infinity;
    let maxFare = -Infinity;

    for (const itinerary of itineraries) {
      const carrierName = itinerary.ValidatingCarrierName;
      const logoFile = itinerary.Citypairs?.[0]?.FlightSegment?.[0]?.FlightLogoName;
      const carrierImage = `https://images.trippro.com/AirlineImages/AirLine/GDS/images/${logoFile}`;
      const baseFare = itinerary.Fares?.[0]?.CCMax ?? 0;
      const noOfStops = itinerary.Citypairs?.[0]?.NoOfStops ?? 0;

      // Track min and max price
      if (baseFare > 0) {
        if (baseFare < minFare) minFare = baseFare;
        if (baseFare > maxFare) maxFare = baseFare;
      }

      // Initialize carrier data if not exists
      if (!carriersMap.has(carrierName)) {
        carriersMap.set(carrierName, {
          image: carrierImage,
          stopFares: {
            "stopes_0": 0,
            "stopes_1": 0,
            "stopes_more": 0
          }
        });
      }

      const carrier = carriersMap.get(carrierName)!;
      const fareKey =
        noOfStops === 0
          ? "stopes_0"
          : noOfStops === 1
            ? "stopes_1"
            : "stopes_more";

      const existingFare = carrier.stopFares[fareKey];
      if (existingFare === 0 || baseFare < existingFare) {
        carrier.stopFares[fareKey] = baseFare;
      }
    }

    // Set prices for slider
    this.lowestPrice = Math.floor(minFare);
    this.highestPrice = Math.ceil(maxFare);
    this.sliderValue = [this.lowestPrice, this.highestPrice];
    this.filters.rangeValues = [...this.sliderValue];

    return Array.from(carriersMap.entries()).map(([carrierName, data]) => {
      const fares = Object.values(data.stopFares).filter(f => f > 0);
      return {
        ValidatingCarrierName: carrierName,
        carrierImage: data.image,
        stopWiseFares: data.stopFares,
        lowestFare: fares.length ? Math.min(...fares) : 0
      };
    });
  }


  availableAirlines = ['Thai Airways', 'Japan Airlines', 'IndiGo', 'Air India'];
  selectedAirlinesMap: { [key: string]: boolean } = {};
  showAllCarriers = false;
  onPriceRangeChange(): void {
    this.filters.rangeValues = this.sliderValue;
    this.applyFilter();
  }
  applyFilter() {
    this.filterSub = this.filterService.filters$.subscribe(f => {
      this.filters = f;
      console.log('Updated Filters:', f);
    });

    this.filterService.setFilters(this.filters);
    const [minPrice, maxPrice] = this.filters.rangeValues;
    const itineraries = this.selectedTab === 'alternate'
      ? this.getNearbyDetails || []
      : this.getMainDetails || [];

    const selectedAirlines = Array.isArray(this.filters.airlines)
      ? this.filters.airlines.map(a => a.toLowerCase())
      : [];

    const stopesFilter = this.filters.stopes;
    const depTimeFilter = this.filters.departureTime;
    const retTimeFilter = this.filters.returnDepartureTime;
    const depArivalTimeFilter = this.filters.arrivalTime;
    const retArivalTimeFilter = this.filters.returnArrivalTime;
    const timeSlots: any = {
      night: { start: 0, end: 6 },
      morning: { start: 6, end: 12 },
      afternoon: { start: 12, end: 18 },
      evening: { start: 18, end: 24 }
    };

    const filtered = itineraries.filter(itinerary => {
      const fare = itinerary.Fares?.[0]?.CCMax ?? 0;
      const validatingCarrier = itinerary.ValidatingCarrierName?.toLowerCase() ?? '';

      const totalStops = itinerary.Citypairs?.[0]?.NoOfStops ?? 0;
      let passes = true;
      if (selectedAirlines.length > 0) {
        passes = passes && selectedAirlines.includes(validatingCarrier);
      }
      console.log("totalStops", totalStops)
      if (stopesFilter && stopesFilter.length > 0) {
        let match = false;
        for (const selectedStop of stopesFilter) {
          if (selectedStop === 0 && totalStops === 0) match = true;
          else if (selectedStop === 1 && totalStops === 1) match = true;
          else if (selectedStop === 2 && totalStops > 1) match = true;
        }
        passes = passes && match;
      }

      passes = passes && fare >= minPrice && fare <= maxPrice;

      if (depTimeFilter && timeSlots[depTimeFilter]) {
        const depTime = itinerary.Citypairs?.[0]?.FlightSegment?.[0]?.DepartureDateTime;
        if (depTime) {
          const depHour = new Date(depTime).getHours();
          const { start, end } = timeSlots[depTimeFilter];
          if (!(depHour >= start && depHour < end)) passes = false;
        }
      }

      if (retTimeFilter && timeSlots[retTimeFilter]) {
        const retTime = itinerary.Citypairs?.[1]?.FlightSegment?.[0]?.ArrivalDateTime;
        if (retTime) {
          const retHour = new Date(retTime).getHours();
          const { start, end } = timeSlots[retTimeFilter];
          if (!(retHour >= start && retHour < end)) passes = false;
        }
      }

      if (depArivalTimeFilter && timeSlots[depArivalTimeFilter]) {
        const deepAtime = itinerary.Citypairs?.[0]?.FlightSegment?.[0]?.ArrivalDateTime;
        if (deepAtime) {
          const retHour = new Date(deepAtime).getHours();
          const { start, end } = timeSlots[depArivalTimeFilter];
          if (!(retHour >= start && retHour < end)) passes = false;
        }
      }

      if (retArivalTimeFilter && timeSlots[retArivalTimeFilter]) {
        const returnArrivalTime = itinerary.Citypairs?.[0]?.FlightSegment?.[0]?.ArrivalDateTime;
        if (returnArrivalTime) {
          const retHour = new Date(returnArrivalTime).getHours();
          const { start, end } = timeSlots[retArivalTimeFilter];
          if (!(retHour >= start && retHour < end)) passes = false;
        }
      }

      return passes;
    });

    // Store all
    this.getFlightAllDetails = filtered;
    if (this.selectedTab != 'alternate') {
      // ------------------ Cheapest Calculation ------------------
      const cheapestSorted = [...filtered].sort((a, b) => {
        const fareA = a.Fares?.[0]?.CCMax ?? Infinity;
        const fareB = b.Fares?.[0]?.CCMax ?? Infinity;
        const stopsA = this.getTotalStops(a);
        const stopsB = this.getTotalStops(b);
        return (fareA + stopsA * 100) - (fareB + stopsB * 100);
      });
      this.cheapestPrice = cheapestSorted[0]?.Fares?.[0]?.CCMax ?? 0;

      // ------------------ Recommended Calculation ------------------
      const recommendedSorted = [...filtered].sort((a, b) => {
        const fareA = a.Fares?.[0]?.CCMax ?? Infinity;
        const fareB = b.Fares?.[0]?.CCMax ?? Infinity;
        const durA = this.getTotalDurationInMinutes(a);
        const durB = this.getTotalDurationInMinutes(b);
        const stopsA = this.getTotalStops(a);
        const stopsB = this.getTotalStops(b);
        return (fareA + durA / 10 + stopsA * 100) - (fareB + durB / 10 + stopsB * 100);
      });
      this.recommendedPrice = recommendedSorted[0]?.Fares?.[0]?.CCMax ?? 0;

      // ------------------ Handle Displayed Flights ------------------
      if (this.selectedTab === 'recommended') {
        this.displayedFlights = recommendedSorted.slice(0, 10);
      } else if (this.selectedTab === 'cheapest') {
        this.displayedFlights = cheapestSorted.slice(0, 10);
      } else {
        this.displayedFlights = filtered;
      }
    } else {
      this.displayedFlights = filtered;
    }

    this.processFlightsAdvanced(this.displayedFlights)
  }


  onStopChange(value: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const index = this.filters.stopes.indexOf(value);

    if (checked && index === -1) {
      this.filters.stopes.push(value);
    } else if (!checked && index !== -1) {
      this.filters.stopes.splice(index, 1);
    }

    this.applyFilter();
  }


  onAirlineToggle(event: Event, airline: string): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.filters.airlines.includes(airline)) {
        this.filters.airlines.push(airline);
      }
    } else {
      this.filters.airlines = this.filters.airlines.filter(a => a !== airline);
    }

    this.applyFilter(); // Call your filter function
  }

  get visibleAirlines() {
    console.log("this.getAllCarrierWiseFares", this.getAllCarrierWiseFares)
    if (!this.getAllCarrierWiseFares || this.getAllCarrierWiseFares.length === 0) {
      return [];
    }

    // Show only the first `this.visibleAirlinesCount` airlines, for "show more" feature
    return this.getAllCarrierWiseFares.slice(0, this.visibleAirlineCount || 5);
  }


  showMoreAirlines(event: Event) {
    event.preventDefault();
    this.showAllAirlines = !this.showAllAirlines;
    this.visibleAirlineCount = this.showAllAirlines
      ? this.getFlightsAdvanced?.uniqueCarriersWithLowestFare?.length || 0
      : 5;
  }
  toggleAirlineSelection(carrierName: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (isChecked) {
      if (!this.filters.airlines.includes(carrierName)) {
        this.filters.airlines.push(carrierName);
      }
    } else {
      this.filters.airlines = this.filters.airlines.filter(
        name => name !== carrierName
      );
    }

    this.applyFilter(); // or whatever action you want
  }
  getTotalDurationInMinutes(itinerary: any): number {
    return itinerary.Citypairs?.reduce((total: number, cp: any) => {
      return total + (cp.DurationInMinutes || this.parseDuration(cp.Duration));
    }, 0) ?? 0;
  }
  recommendedPrice: number = 0;
  cheapestPrice: number = 0;

  allFlights: any[] = [];
  displayedFlights: any[] = [];
  selectTab(tab: string) {
    this.selectedTab = tab;


  }

  // Fallback parser if DurationInMinutes is missing
  parseDuration(durationStr: string): number {
    const match = durationStr.match(/(\d+)D\s*(\d+)H\s*(\d+)M/);
    if (!match) return 0;
    const [, d, h, m] = match.map(Number);
    return (d || 0) * 1440 + (h || 0) * 60 + (m || 0);
  }
  getTotalStops(itinerary: any): number {
    return itinerary.Citypairs?.reduce((acc: number, cp: any) => acc + (cp.NoOfStops || 0), 0);
  }
  processFlightsAdvanced(filtered: any) {
    const itineraries = filtered || [];
    // Show all by default
    this.displayedFlights = [...itineraries];
    console.log("displayedFlights", this.displayedFlights)

    // Refresh tab selection
    this.selectTab(this.selectedTab);
    interface CarrierData {
      image: string;
      stopFares: {
        "stopes_0": number;
        "stopes_1": number;
        "stopes_more": number;
      };
    }

    const carriersMap = new Map<string, CarrierData>();
    const stopWiseLowestFareMap = new Map<number, number>();
    const allBaseFares: number[] = [];

    let zeroStopCount = 0;
    let oneStopCount = 0;
    let moreThanOneStopCount = 0;

    for (const itinerary of itineraries) {
      const carrierName = itinerary.ValidatingCarrierName;
      const logoFile = itinerary.Citypairs?.[0]?.FlightSegment?.[0]?.FlightLogoName;
      const carrierImage = `https://images.trippro.com/AirlineImages/AirLine/GDS/images/${logoFile}`;
      const baseFare = itinerary.Fares?.[0]?.CCMax ?? 0;
      const noOfStops = itinerary.Citypairs?.[0]?.NoOfStops ?? 0;

      allBaseFares.push(baseFare);
      console.log("noOfStops", noOfStops)

      // Count stops
      if (noOfStops === 0) zeroStopCount++;
      else if (noOfStops === 1) oneStopCount++;
      else moreThanOneStopCount++;

      // Track lowest stop-wise fare globally
      const existingGlobalFare = stopWiseLowestFareMap.get(noOfStops);
      if (existingGlobalFare === undefined || baseFare < existingGlobalFare) {
        stopWiseLowestFareMap.set(noOfStops, baseFare);
      }

      // Initialize carrier data if not exists
      if (!carriersMap.has(carrierName)) {
        carriersMap.set(carrierName, {
          image: carrierImage,
          stopFares: {
            "stopes_0": 0,
            "stopes_1": 0,
            "stopes_more": 0
          }
        });
      }

      const carrier = carriersMap.get(carrierName)!;
      const fareKey =
        noOfStops === 0
          ? "stopes_0"
          : noOfStops === 1
            ? "stopes_1"
            : "stopes_more";

      const existingFare = carrier.stopFares[fareKey];
      if (existingFare === 0 || baseFare < existingFare) {
        carrier.stopFares[fareKey] = baseFare;
      }
    }

    // Prepare result
    const uniqueCarriersWithLowestFare = Array.from(carriersMap.entries()).map(
      ([carrierName, data]) => {
        const stopFares = data.stopFares;

        // Get minimum non-zero value (if some stop type wasn't assigned yet, its default is 0)
        const fareValues = Object.values(stopFares).filter(f => f > 0);
        const lowestFare = fareValues.length ? Math.min(...fareValues) : 0;

        return {
          ValidatingCarrierName: carrierName,
          carrierImage: data.image,
          stopWiseFares: stopFares,
          lowestFare: lowestFare   // ✅ Added key here
        };
      }
    );

    console.log("stopWiseLowestFareMap", stopWiseLowestFareMap)
    const stopWiseLowestFare: {
      stopes_0: number;
      stopes_1: number;
      stopes_more: number;
    } = {
      stopes_0: stopWiseLowestFareMap.get(0) ?? 0,
      stopes_1: stopWiseLowestFareMap.get(1) ?? 0,
      stopes_more: Array.from(stopWiseLowestFareMap.entries())
        .filter(([stops]) => stops > 1)
        .reduce((min, [_, fare]) => (min === 0 || fare < min ? fare : min), 0)
    };




    const lowestPrice = Math.min(...allBaseFares);
    const highestPrice = Math.max(...allBaseFares);

    const stopCounts = {
      "stopes_0": zeroStopCount,
      "stopes_1": oneStopCount,
      "more_than_1": moreThanOneStopCount
    };

    const result = {
      uniqueCarriersWithLowestFare,
      stopWiseLowestFare,
      lowestPrice,
      highestPrice,
      stopCounts
    };

    this.getFlightsAdvanced = result;
    console.log("✅ Final Processed Result:", result);
    return result;
  }



  filterCountry(event: any): void {
    const query = event.query.toLowerCase();

    this.flightService.airportlList(query).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {

        this.departureAirports = res.data.map((airport: any) => ({
          displayName: `${airport.city} - ${airport.country}`,
          code: airport.airport_code,
          city: airport.city,
          airport_name: airport.airport_name,
          country: airport.country// keep full object if needed later
        }));
      },
      error: (err) => {
        this.toasterService.showError(err.error.message || 'Something went wrong while fetching vendor list!')
      }
    })

  }
  private handleTripTypeValidation() {
    const controls = this.flightForm.controls;

    this.flightForm.get('tripType')?.valueChanges.subscribe((tripType: string) => {
      // Clear all validators
      this.clearValidators();

      if (tripType === 'oneway') {
        controls['departureAirport'].setValidators(Validators.required);
        controls['arrivalAirport'].setValidators(Validators.required);
        controls['departureDate'].setValidators(Validators.required);
        this.passengersGroup.setValidators(Validators.required);
      } else if (tripType === 'roundtrip') {
        controls['departureAirport'].setValidators(Validators.required);
        controls['arrivalAirport'].setValidators(Validators.required);
        controls['departureDate'].setValidators(Validators.required);
        controls['arrivalDate'].setValidators(Validators.required);
        this.passengersGroup.setValidators(Validators.required);
      }  else if (tripType === 'multicity') {
  // Set required initially
  this.multiCitySegments.setValidators(Validators.required);

  // Add 1 segment if empty
  if (this.multiCitySegments.length === 0) {
  }

  // Watch for changes and remove validation after at least one is added
        this.multiCitySegments.clearValidators();
        this.multiCitySegments.updateValueAndValidity({ emitEvent: false });}

      // Update form control validity
      Object.values(controls).forEach(ctrl => {
        ctrl.updateValueAndValidity({ emitEvent: false });
      }); this.passengersGroup.updateValueAndValidity();
      this.multiCitySegments.updateValueAndValidity();
    });

    // Trigger validation on first load
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

  // updateInput() {
  //   const total =
  //     this.selectedAdults + this.selectedChildren + this.selectedInfants;

  //   const selectedCabin = this.passengersGroup.get('cabin')?.value;
  //   this.selectedCabin = selectedCabin;

  //   this.inputValue = `${total} Passenger${total !== 1 ? 's' : ''} ${
  //     selectedCabin?.name
  //   }`;
  // }

updateInput() {
  const total = this.selectedAdults + this.selectedChildren + this.selectedInfants;

  const selectedCabin = this.passengersGroup.get('cabin')?.value;
  this.selectedCabin = selectedCabin;

  // Find the cabin name from the cabinOptions
  const cabinName = this.cabinOptions.find(option => option.value === selectedCabin)?.name || '';

  this.inputValue = `${total} Passenger${total !== 1 ? 's' : ''} ${cabinName}`;
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


  sendPayload(): any {
    const formValue = this.flightForm.value;
    const passengers = formValue.passengers;
    const tripType = formValue.tripType;
    console.log("passengers23", passengers);
    console.log("formValue34", formValue)

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
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    if (tripType === 'oneway') {
      payload.OriginDestination.push({
        DepartureTime: formatDate(formValue.departureDate),
        DepartureLocationCode: formValue.departureAirport.code,
        ArrivalLocationCode: formValue.arrivalAirport.code,
        CabinClass: passengers.cabin,
      });
    }

    else if (tripType === 'roundtrip') {
      payload.OriginDestination.push(
        {
          DepartureTime: formatDate(formValue.departureDate),
          DepartureLocationCode: formValue.departureAirport.code,
          ArrivalLocationCode: formValue.arrivalAirport.code,
          CabinClass: passengers.cabin,
        },
        {
          DepartureTime: formatDate(formValue.arrivalDate),
          DepartureLocationCode: formValue.arrivalAirport.code,
          ArrivalLocationCode: formValue.departureAirport.code,
          CabinClass: passengers.cabin,
        }
      );
      payload.returnDate = formatDate(formValue.arrivalDate);
    }

    else if (tripType === 'multicity') {
      payload.OriginDestination.push({
        DepartureTime: formatDate(formValue.departureDate),
        DepartureLocationCode: formValue.departureAirport.code,
        ArrivalLocationCode: formValue.arrivalAirport.code,
        CabinClass: passengers.cabin,
      });
      this.multiCitySegments.controls.forEach((segment: any) => {
        const segValue = segment.value;
        payload.OriginDestination.push({
          DepartureTime: formatDate(segValue.departureDate),
          DepartureLocationCode: segValue.departure.code,
          ArrivalLocationCode: segValue.arrival.code,
          CabinClass: passengers.cabin, // You can customize cabin per segment if needed
        });
      });
    }

    return payload;
  }
  buildFlightPayload(): any {
    const formValue = this.flightForm.value;
    const passengers = formValue.passengers;
    const tripType = formValue.tripType;
    console.log("passengersget", passengers);
    console.log("formValueget", formValue)

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
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    if (tripType === 'oneway') {
      payload.OriginDestination.push({
        DepartureTime: formValue.departureDate,
        DepartureLocationCode: formValue.departureAirport,
        ArrivalLocationCode: formValue.arrivalAirport,
        CabinClass: passengers.cabin,
      });
    }

    else if (tripType === 'roundtrip') {
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
    }

 else if (tripType === 'multicity') {
 console.log(formValue,"formValue")
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
  // TODO: COPY TO SYNCINNS
arrivalCountry: string = '';
departCountry:string='';
isDomestic :boolean=false;
arrivalCountries: string[] = [];
departureCountries: string[] = [];
onArrivalSelected(event: any){
  this.arrivalCountry = event?.value?.country || '';
}
onDepartSelected(event: any){
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
  this.arrivalCountries.forEach(country => allCountries.add(country));
  this.departureCountries.forEach(country => allCountries.add(country));

  console.log('All countries involved:', Array.from(allCountries));
  
  // Domestic only if all are the same
  return allCountries.size === 1;
}
// TODO: COPY TO SYNCINNS
  searchFlights() {
      const segments = this.flightForm.value.multiCitySegments;
  console.log('Submitted Segments:', segments);
    this.submitted = true;
    if (this.flightForm.valid) {
// TODO: COPY TO SYNCINNS
  const formValue = this.flightForm.value; 

      if(formValue?.tripType=='multicity'){
         console.log("this.departCountry",this.checkIfAllDomestic());
        this.isDomestic  = this.checkIfAllDomestic();
      localStorage.setItem("isDomestic", JSON.stringify(this.isDomestic));
      }else{
       if (this.arrivalCountry === this.departCountry) {
  this.isDomestic = true;
  localStorage.setItem("isDomestic", JSON.stringify(true));
} else {
  this.isDomestic = false;
  localStorage.setItem("isDomestic", JSON.stringify(false));
}


      } 
      // TODO: COPY TO SYNCINNS
      const savepayload = this.buildFlightPayload();
      console.log('Final Payload:', savepayload);
      this.searchService.setSearchData(savepayload);
      const payload = this.sendPayload();
      console.log(' Payload:', payload);
      this.getFlights(payload);
      this.showDropdown = false;
      console.log("this.flightForm.value", this.flightForm.value)
      // send to API
    } else {
      this.flightForm.markAllAsTouched();
    }

  }

  scrollLeft(): void {
    const el = this.tableWrapper.nativeElement;
    el.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(), 400);
  }

  scrollRight(): void {
    const el = this.tableWrapper.nativeElement;
    el.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(), 400);
  }

  updateScrollButtons(): void {
    const el = this.tableWrapper.nativeElement;
    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;

    this.isScrollLeftDisabled = scrollLeft <= 0;
    this.isScrollRightDisabled = scrollLeft + clientWidth >= scrollWidth - 1;
  }

  // Optional: Listen to scroll events
  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollButtons();
  }

  showFlightDetails(itineraryId: number): void {
    this.showDetailsMap[itineraryId] = !this.showDetailsMap[itineraryId];

  }

  hideFlightDetails(itineraryId: number): void {
    this.showDetailsMap[itineraryId] = !this.showDetailsMap[itineraryId];
  }

  getSliderBackground(value: number): string {
    return `linear-gradient(to right, orange ${value}%, #ccc ${value}%)`;
  }

  navigateFlightDetails(id: number): void {
    this.router.navigate(['/flight-details'], {
      queryParams: {
        id: id
      }
    });
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }



  slidePrev() {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  }

  slideNext() {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }
  reset(): void {
    this.filterService.resetFilters();
    this.sliderValue = [this.lowestPrice, this.highestPrice];

    this.applyFilter();
  }


  ngOnDestroy() {
    this.filterSub?.unsubscribe();
    if (this.swiper) {
      this.swiper.destroy();
    }
  }

}
