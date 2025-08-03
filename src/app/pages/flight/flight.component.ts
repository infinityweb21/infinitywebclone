import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { MainFilterComponent } from '../../components/main-filter/main-filter.component';
import { CommonModule, NgFor } from '@angular/common';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-flight',
  imports: [MainFilterComponent, NgFor, CommonModule, CollapseDirective],
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
      airline: 'Japan Airlines',
      flightNumber: 'Japan Airlines 8',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at San Francisco',
      from: 'New York',
      to: 'Tokyo',
      dateStart: 'Sep 01, 2025',
      dateEnd: 'Sep 07, 2025',
      price: 7952,
      seatsLeft: 18,
    },
    {
      id: 2,
      image: 'assets/images/flight/air_canada870.webp',
      isCheapest: false,
      airline: 'Air Canada',
      flightNumber: 'Air Canada 870',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Montreal',
      from: 'Los Angeles',
      to: 'Paris',
      dateStart: 'Sep 02, 2025',
      dateEnd: 'Sep 09, 2025',
      price: 8952,
      seatsLeft: 25,
    },
    {
      id: 3,
      image: 'assets/images/flight/british_airways99.webp',
      isCheapest: false,
      airline: 'British Airways',
      flightNumber: 'British Airways 99',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Heathrow',
      from: 'Chicago',
      to: 'London',
      dateStart: 'Sep 03, 2025',
      dateEnd: 'Sep 10, 2025',
      price: 7952,
      seatsLeft: 22,
    },
    {
      id: 4,
      image: 'assets/images/flight/delta_airlines_199.webp',
      isCheapest: false,
      airline: 'Delta Airlines',
      flightNumber: 'Delta Airlines 199',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: 'Direct flight',
      from: 'San Francisco',
      to: 'New York',
      dateStart: 'Sep 04, 2025',
      dateEnd: 'Sep 07, 2025',
      price: 6952,
      seatsLeft: 30,
    },
    {
      id: 5,
      image: 'assets/images/flight/air_canada215.webp',
      isCheapest: false,
      airline: 'Air Canada',
      flightNumber: 'Air Canada 215',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Frankfurt',
      from: 'Toronto',
      to: 'Bangkok',
      dateStart: 'Sep 04, 2025',
      dateEnd: 'Sep 07, 2025',
      price: 8952,
      seatsLeft: 22,
    },
    {
      id: 6,
      image: 'assets/images/flight/air_canada_33.webp',
      isCheapest: false,
      airline: 'Air Canada',
      flightNumber: 'Air Canada 33',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Vancouver',
      from: 'Vancouver',
      to: 'Sydney',
      dateStart: 'Sep 05, 2025',
      dateEnd: 'Sep 12, 2025',
      price: 6952,
      seatsLeft: 15,
    },
    {
      id: 6,
      image: 'assets/images/flight/air_canada_33.webp',
      isCheapest: false,
      airline: 'Air Canada',
      flightNumber: 'Air Canada 33',
      logo: 'assets/images/flight/flight-elips-img.png',
      stops: '1-stop at Istanbul',
      from: 'Miami',
      to: 'Dubai',
      dateStart: 'Sep 06, 2025',
      dateEnd: 'Sep 13, 2025',
      price: 7952,
      seatsLeft: 20,
    },
  ];

  providers = [
    {
      id: 1,
      name: 'Delta Air Lines',
      image: 'assets/images/flight/delta_air_lines.webp',
      rating: 4.6,
      reviews: '210k Reviews',
      flights: '18+',
      locations: '220',
      isCollapsed: false,
    },
    {
      id: 2,
      name: 'United Airlines',
      image: 'assets/images/flight/united_airlines.webp',
      rating: 4.5,
      reviews: '185k Reviews',
      flights: '17+',
      locations: '230',
      isCollapsed: false,
    },
    {
      id: 3,
      name: 'American Airlines',
      image: 'assets/images/flight/american_airlines.webp',
      rating: 4.4,
      reviews: '198k Reviews',
      flights: '20+',
      locations: '250',
      isCollapsed: false,
    },
    {
      id: 4,
      name: 'Alaska Airlines',
      image: 'assets/images/flight/alaska_airlines.webp',
      rating: 4.3,
      reviews: '92k Reviews',
      flights: '12+',
      locations: '115',
      isCollapsed: false,
    },
    {
      id: 5,
      name: 'Southwest Airlines',
      image: 'assets/images/flight/soutthwest.webp',
      rating: 4.2,
      reviews: '165k Reviews',
      flights: '14+',
      locations: '130',
      isCollapsed: false,
    },
    {
      id: 6,
      name: 'JetBlue Airways',
      image: 'assets/images/flight/jetblue.webp',
      rating: 4.1,
      reviews: '88k Reviews',
      flights: '10+',
      locations: '100',
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
  ngOnInit():void{
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
