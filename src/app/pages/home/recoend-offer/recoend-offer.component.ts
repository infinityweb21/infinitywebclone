import { NgFor } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-recoend-offer',
  imports: [ NgFor,RouterLink],
  templateUrl: './recoend-offer.component.html',
  styleUrl: './recoend-offer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecoendOfferComponent implements OnInit {
  @ViewChild('recoendSwiperRef', { static: true })
  recoendSwiperRef!: ElementRef;
  @ViewChild('recoendSwiperRef1', { static: true })
  recoendSwiperRef1!: ElementRef;
  @ViewChild('offerSwiperRef', { static: true }) offerSwiperRef!: ElementRef;

  recommendedProducts = [
    {
      image: 'assets/images/home/swiss_alps_escape.webp',
      title: 'Swiss Alps Escape',
      duration: '4 Days | 3 Nights',
      rating: 4.7,
      details: {
        flights: '2 Flights',
        hotels: '1 Hotel',
        transfers: '2 Transfers',
        activities: '4 Activities',
      },
      description: [
        'Scenic train ride',
        'Local village walk',
        'Glacier excursion',
      ],
      link: '#',
    },
    {
      image: 'assets/images/home/paries_getaway.webp',
      title: 'Paris Getaway',
      duration: '5 Days | 4 Nights',
      rating: 4.8,
      details: {
        flights: '2 Flights',
        hotels: '1 Hotel',
        transfers: '2 Transfers',
        activities: '4 Activities',
      },
      description: [
        'Seine River Cruise',
        'Guided city walk',
        'Louvre access',
      ],

      link: '/top-destinations/paris',
    },
    {
      image: 'assets/images/home/california_dreaming.webp',
      title: 'California Dreaming',
      duration: '6 Days | 5 Nights',
      rating: 4.7,
      details: {
        flights: '2 Flights',
        hotels: '1 Hotel',
        transfers: '2 Transfers',
        activities: '4 Activities',
      },
      description: [
        'Hollywood City Tour',
        'Santa Monica Beach Day',
        'Universal Studios Entry',
      ],
      link: '/top-destinations/california',
    },
    {
      image: 'assets/images/home/florida_escape.webp',
      title: 'Florida Escape',
      duration: '6 Days | 5 Nights',
      rating: 4.6,
      details: {
        flights: '2 Flights',
        hotels: '1 Hotel',
        transfers: '2 Transfers',
        activities: '4 Activities',
      },
      description: [
        'Walt Disney World Pass',
        'Everglades Airboat Tour',
        'Miami Beach Day Trip',
      ],
      link: '/top-destinations/florida',
    },
    {
      image: 'assets/images/home/tokyo_tour.webp',
      title: 'Tokyo Tour',
      duration: '5 Days | 4 Nights',
      rating: 4.9,
      details: {
        flights: '2 Flights',
        hotels: '1 Hotel',
        transfers: '2 Transfers',
        activities: '4 Activities',
      },
      description: [
        'Mt. Fuji day trip',
        'Sushi-making class',
        'City walking tour',
      ],
      link: '/top-destinations/tokyo',
    },
    {
      image: 'assets/images/home/rome_journey.webp',
      title: 'Rome Journey',
      duration: '4 Days | 3 Nights',
      rating: 4.7,
      details: {
        flights: '2 Flights',
        hotels: '1 Hotel',
        transfers: '2 Transfers',
        activities: '4 Activities',
      },
      description: [
        'Colosseum guided tour',
        'Vatican City visit',
        'Trevi Fountain stop',
      ],
      link: '/top-destinations/rome',
    },
    {
      image: 'assets/images/home/singapore_city_fun.webp',
      title: 'Singapore City Fun',
      duration: '4 Days | 3 Nights',
      rating: 4.8,
      details: {
        flights: '2 Flights',
        hotels: '1 Hotel',
        transfers: '2 Transfers',
        activities: '4 Activities',
      },
      description: [
        'Gardens by the Bay',
        'Sentosa Island Entry',
        'Night Safari Ride',
      ],
      link: '/top-destinations/singapore',
    },
    {
      image: 'assets/images/home/london_getaway.webp',
      title: 'London Getaway',
      duration: '4 Days | 3 Nights ',
      rating: 4.9,
      details: {
        flights: '2 Flights',
        hotels: '1 Hotel',
        transfers: '2 Transfers',
        activities: '4 Activities',
      },
      description: [
        'London Eye ride',
        'Tower of London entry',
        'Thames River cruise',
      ],
      // price: 90952,
      // originalPrice: 88952,
      link: '/top-destinations/london',
    }
  ];

  flights = [
    {
      image: 'assets/images/home/paris.webp',
      destination: 'Paris',
      route: 'NYC - CDG',
      dateRange: 'Sep 12 - Oct 10',
      rating: 4.8,
      price: 80952,
      link: '#',
    },
    {
   image: 'assets/images/home/rome.webp',
      destination: 'Rome',
      route: 'LHR - FCO',
      dateRange: 'Sep 12 - Oct 10',
      rating: 4.6,
      price: 81952,
      link: '#',
    },
    {
   image: 'assets/images/home/tokyo1.webp',
      destination: 'Tokyo',
      route: 'LAX - HND',
      dateRange: 'Sep 12 - Oct 10',
      rating: 4.9,
      price: 82952,
      link: '#',
    },
    {
   image: 'assets/images/home/singapore1.webp',
      destination: 'Singapore',
      route: 'LAX - SIN',
      dateRange: 'Sep 12 - Oct 10',
      rating: 4.7,
      price: 83952,
      link: '#',
    },
    {
   image: 'assets/images/home/barcelona.webp',
      destination: 'Barcelona',
      route: 'JFK - BCN',
      dateRange: 'Sep 12 - Oct 10',
      rating: 4.5,
      price: 84952,
      link: '#',
    },
    {
   image: 'assets/images/home/zurich.webp',
      destination: 'Zurich',
      route: 'ORD - ZRH',
      dateRange: 'Sep 12 - Oct 10',
      rating: 4.5,
      price: 84952,
      link: '#',
    },
    {
   image: 'assets/images/home/london.webp',
      destination: 'London',
      route: 'BOS - LHR',
      dateRange: 'Sep 12 - Oct 10',
      rating: 4.9,
      price: 84952,
      link: '#',
    },
    {
   image: 'assets/images/home/newyork1.webp',
      destination: 'New York',
      route: 'DEL - JFK',
      dateRange: 'Sep 12 - Oct 10',
      rating: 4.8,
      price: 84952,
      link: '#',
    }
    // Add more flight objects if needed
  ];
  offers = [
    {
      image: 'assets/images/home/offer-img-1.webp',
      category: 'Flight Fest',
      title: 'Fly more, spend less on top domestic and global routes',
      description: 'Grab the Best Flight Deals Now',
      link: '#',
    },
    {
         image: 'assets/images/home/cruise_server.webp',
      category: 'Cruise Saver',
      title: 'Sail away with exclusive deals on luxury cruise packages',
      description: 'Get Great Cruise Discounts Today',
      link: '#',
    },
    {
         image: 'assets/images/home/hotel_deals.webp',
      category: 'Hotel Deals',
      title: 'Top-rated stays at truly pocket-friendly hotel prices',
      description: 'Find Amazing Hotel Offers Near You',
      link: '#',
    },
    {
         image: 'assets/images/home/customizable_deals.webp',
      category: 'Customizable Deals',
      title: 'Create your own offer with flexible travel options ',
      description: 'Design Your Perfect Travel Package',
      link: '#',
    }
    // Add more offer objects here as needed
  ];

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
    const swiperEl: any = this.recoendSwiperRef.nativeElement;
    const swiperEl1: any = this.recoendSwiperRef1.nativeElement;
    const swiperEl2: any = this.offerSwiperRef.nativeElement;

    // Wait for Web Component upgrade to be ready
    customElements.whenDefined('swiper-container').then(() => {
      // Set params BEFORE initializing
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
        },
      };
      const offerSwiperParams = {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
        },
      };
      Object.assign(swiperEl, swiperParams);
      Object.assign(swiperEl1, swiperParams);
      Object.assign(swiperEl2, offerSwiperParams);
      // and now initialize it
      swiperEl.initialize();
      swiperEl1.initialize();
      swiperEl2.initialize();
    });
  }
}
