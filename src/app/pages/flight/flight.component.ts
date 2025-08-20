import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewChild } from '@angular/core';
import { MainFilterComponent } from '../../components/main-filter/main-filter.component';
import { CommonModule, NgFor } from '@angular/common';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-flight',
  imports: [MainFilterComponent, CommonModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FlightComponent {
  @ViewChild('flightsSwiperRef', { static: true })
  flightsSwiperRef!: ElementRef;
  @ViewChild('providersSwiperRef', { static: true })
  providersSwiperRef!: ElementRef;
constructor(    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute){
      
    }
  flights = [
    {
      id: 1,
      image: 'assets/images/flight/japan_airline_8.webp',
      isCheapest: true,
      airline: 'American Airlines',
      flightNumber: 'American Airlines AA 100',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at San Francisco',
      from: 'New York',
      to: 'London ',
      dateStart: 'Dec 18, 2025',
      dateEnd: 'Dec 22, 2025',
      price: 7952,
      seatsLeft: 12,
    },
    {
      id: 2,
      image: 'assets/images/flight/air_canada870.webp',
      isCheapest: false,
      airline: 'Southwest Airlines',
      flightNumber: 'Southwest Airlines WN 1247',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Montreal',
      from: 'Los Angeles',
      to: 'Chicago',
      dateStart: 'Jan 8, 2025',
      dateEnd: 'Jan 15, 2025',
      price: 8952,
      seatsLeft: 16,
    },
    {
      id: 3,
      image: 'assets/images/flight/british_airways99.webp',
      isCheapest: false,
      airline: 'Alaska Airlines ',
      flightNumber: 'Alaska Airlines AS 61',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Heathrow',
      from: 'Seattle',
      to: 'Anchorage',
      dateStart: 'Feb 8, 2025 ',
      dateEnd: 'Feb 10, 2025 ',
      price: 7952,
      seatsLeft: 10,
    },
    {
      id: 4,
      image: 'assets/images/flight/delta_airlines_199.webp',
      isCheapest: false,
      airline: 'Hawaiian Airlines',
      flightNumber: 'Hawaiian Airlines HA 11',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: 'Direct flight',
      from: 'San Francisco',
      to: 'Honolulu',
      dateStart: 'Dec 18, 2025 ',
      dateEnd: 'Dec 25, 2025 ',
      price: 6952,
      seatsLeft: 8,
    },
    {
      id: 5,
      image: 'assets/images/flight/air_canada215.webp',
      isCheapest: false,
      airline: 'Air Canada',
      flightNumber: 'Frontier Airlines F9 1545',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Frankfurt',
      from: 'Denver',
      to: 'Las Vegas ',
      dateStart: 'Jan 2, 2025',
      dateEnd: 'Jan 26, 2025',
      price: 8952,
      seatsLeft: 26,
    },
    {
      id: 6,
      image: 'assets/images/flight/air_canada_33.webp',
      isCheapest: false,
      airline: 'Latam Airlines',
      flightNumber: 'LATAM Airlines LA 531',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Vancouver',
      from: 'Miami',
      to: 'São Paulo ',
      dateStart: 'Sep 05, 2025',
      dateEnd: 'Sep 12, 2025',
      price: 6952,
      seatsLeft: 4,
    },
    {
      id: 6,
      image: 'assets/images/flight/air_canada_33.webp',
      isCheapest: false,
      airline: 'Emirates ',
      flightNumber: 'Emirates EK 237',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Istanbul',
      from: 'Boston',
      to: 'Dubai',
      dateStart: 'October 18, 2025 ',
      dateEnd: 'October 25, 2025',
      price: 7952,
      seatsLeft: 6,
    },
  ];

  providers = [
    {
      id: 1,
      name: 'Air Canada ',
      image: 'assets/images/flight/Air-Canada.png',
      rating: 4.1,
      reviews: '142k Reviews ',
      flights: '18+',
      locations: '65',
      isCollapsed: false,
    },
    {
      id: 2,
      name: 'British Airways ',
      image: 'assets/images/flight/British-Airways.png',
      rating: 4.0,
      reviews: '178k Reviews',
      flights: '12+',
      locations: '25',
      isCollapsed: false,
    },
    {
      id: 3,
      name: 'Lufthansa ',
      image: 'assets/images/flight/Lufthansa.png',
      rating: 4.2,
      reviews: '165k Reviews ',
      flights: '10+',
      locations: '18',
      isCollapsed: false,
    },
    {
      id: 4,
      name: 'Emirates ',
      image: 'assets/images/flight/Emirates.png',
      rating: 4.5,
      reviews: '156k Reviews',
      flights: '8+',
      locations: '12',
      isCollapsed: false,
    },
    {
      id: 5,
      name: 'Virgin Atlantic ',
      image: 'assets/images/flight/Virgin-Atlantic.png',
      rating: 4.3,
      reviews: '89k Reviews ',
      flights: '15+',
      locations: '15',
      isCollapsed: false,
    },
    {
      id: 6,
      name: 'KLM Royal Dutch Airlines ',
      image: 'assets/images/flight/KLM-Royal-Dutch-Airlines.png',
      rating: 4.2,
      reviews: '76k Reviews ',
      flights: '9+',
      locations: '12',
      isCollapsed: false,
    },
  ];

  trendingFlights = [
    {
      id: 1,
      thumbnail: 'assets/images/flight/from_newyork.webp',
      airlineLogo:
        'https://images.trippro.com/AirlineImages/AirLine/GDS/images/jetBlueAirways.gif',
      price: '$81,559',
      fromCity: 'New York',
      fromTime: '09:30',
      fromPeriod: 'A.M.',
      toCity: 'London',
      toTime: '16:45',
      toPeriod: 'P.M.',
      tripDuration: '7h, 15m',
      departureDate: 'Tue, Jul 22, 2025',
      duration: '0D 5H 34M',
      flightNumber: 'JetBlue Airways 1524',
      departureTime: '10:27 PM',
      departureAirport: 'LAX',
      departureAirportFull: 'Los Angeles International Airport',
      arrivalTime: '07:01 AM',
      arrivalDate: 'Wed, Jul 23, 2025',
      arrivalAirport: 'JFK',
      arrivalAirportFull: 'John F. Kennedy International Airport',
      flightClass: 'Economy',
      miscInfo: [
        { icon: 'fa-plane-tail', text: 'Unknown Aircraft' },
        { icon: 'fa-seat-airline', text: 'Unknown Seat Pitch' },
        { icon: 'fa-fork-knife', text: 'Light meal (fee)' },
      ],
      isCollapsed: true,
    },
    {
      id: 2,
      thumbnail: 'assets/images/flight/from_los_angeles.webp',
      airlineLogo:
        'https://images.trippro.com/AirlineImages/AirLine/GDS/images/jetBlueAirways.gif',
      price: '$72,409',
      fromCity: 'Los Angeles',
      fromTime: '14:00',
      fromPeriod: 'P.M.',
      toCity: 'Tokyo',
      toTime: '19:20',
      toPeriod: 'P.M.',
      tripDuration: '11h, 20m',
      departureDate: 'Tue, Jul 22, 2025',
      duration: '0D 5H 34M',
      flightNumber: 'JetBlue Airways 1524',
      departureTime: '10:27 PM',
      departureAirport: 'LAX',
      departureAirportFull: 'Los Angeles International Airport',
      arrivalTime: '07:01 AM',
      arrivalDate: 'Wed, Jul 23, 2025',
      arrivalAirport: 'JFK',
      arrivalAirportFull: 'John F. Kennedy International Airport',
      flightClass: 'Economy',
      miscInfo: [
        { icon: 'fa-plane-tail', text: 'Unknown Aircraft' },
        { icon: 'fa-seat-airline', text: 'Unknown Seat Pitch' },
        { icon: 'fa-fork-knife', text: 'Light meal (fee)' },
      ],
      isCollapsed: true,
    },
    {
      id: 3,
      thumbnail: 'assets/images/flight/from_Chicago.webp',
      airlineLogo:
        'https://images.trippro.com/AirlineImages/AirLine/GDS/images/jetBlueAirways.gif',
      price: '$64,559',
      fromCity: 'Chicago',
      fromTime: '17:15',
      fromPeriod: 'P.M.',
      toCity: 'Paris',
      toTime: '07:55',
      toPeriod: 'A.M.',
      tripDuration: '8h, 40m',
      departureDate: 'Tue, Jul 22, 2025',
      duration: '0D 5H 34M',
      flightNumber: 'JetBlue Airways 1524',
      departureTime: '10:27 PM',
      departureAirport: 'LAX',
      departureAirportFull: 'Los Angeles International Airport',
      arrivalTime: '07:01 AM',
      arrivalDate: 'Wed, Jul 23, 2025',
      arrivalAirport: 'JFK',
      arrivalAirportFull: 'John F. Kennedy International Airport',
      flightClass: 'Economy',
      miscInfo: [
        { icon: 'fa-solid fa-plane', text: 'Unknown Aircraft' },
        { icon: 'fa-seat-airline', text: 'Unknown Seat Pitch' },
        { icon: 'fa-fork-knife', text: 'Light meal (fee)' },
      ],
      isCollapsed: true,
    },
    {
      id: 4,
      thumbnail: 'assets/images/flight/from_san_francisco.webp',
      airlineLogo:
        'https://images.trippro.com/AirlineImages/AirLine/GDS/images/jetBlueAirways.gif',
      price: '$89,559',
      fromCity: 'San Francisco',
      fromTime: '10:00',
      fromPeriod: 'A.M.',
      toCity: 'Frankfurt',
      toTime: '08:10',
      toPeriod: 'P.M.',
      tripDuration: '10h, 10m',
      departureDate: 'Tue, Jul 22, 2025',
      duration: '0D 5H 34M',
      flightNumber: 'JetBlue Airways 1524',
      departureTime: '10:27 PM',
      departureAirport: 'LAX',
      departureAirportFull: 'Los Angeles International Airport',
      arrivalTime: '07:01 AM',
      arrivalDate: 'Wed, Jul 23, 2025',
      arrivalAirport: 'JFK',
      arrivalAirportFull: 'John F. Kennedy International Airport',
      flightClass: 'Economy',
      miscInfo: [
        { icon: 'fa-plane-tail', text: 'Unknown Aircraft' },
        { icon: 'fa-seat-airline', text: 'Unknown Seat Pitch' },
        { icon: 'fa-fork-knife', text: 'Light meal (fee)' },
      ],
      isCollapsed: true,
    },
    // Add more flight objects as needed
  ];

  toggleDetails(index: number) {
    this.trendingFlights.forEach((flight, i) => {
      flight.isCollapsed = i !== index ? true : !flight.isCollapsed;
    });
  }
  ngAfterViewInit(): void {
    const swiperEl: any = this.flightsSwiperRef.nativeElement;
    const swiperEl1: any = this.providersSwiperRef.nativeElement;

    // Wait for Web Component upgrade to be ready
    customElements.whenDefined('swiper-container').then(() => {
      // Set params BEFORE initializing
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        breakpoints: {
          1400: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
        },
      };

      const swiperParams1 = {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        breakpoints: {
          1400: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
        },
      };

      Object.assign(swiperEl, swiperParams);
      Object.assign(swiperEl1, swiperParams1);

      // and now initialize it
      swiperEl.initialize();
      swiperEl1.initialize();
    });
  }
  private shareService: SharedService = inject(SharedService);
    getData:any='';
 
  ngOnInit():void{
   this.getData=this.shareService.getcompanyName();
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
  }
}
