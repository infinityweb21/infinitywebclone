import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MainFilterComponent } from '../../components/main-filter/main-filter.component';
import { SvgIcons } from '../../shared/svg-icons';

import { SharedService } from '../../services/shared/shared.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hotel',
  imports: [MainFilterComponent],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HotelComponent {
  // Company Name Get
  private shareService: SharedService = inject(SharedService);
  companyName: string = '';

  @ViewChild('hotelRoomsSwiperRef', { static: true })
  hotelRoomsSwiperRef!: ElementRef;
  @ViewChild('recoendSwiperRef', { static: true })
  recoendSwiperRef!: ElementRef;
  @ViewChild('accomodationSliderRef', { static: true })
  accomodationSliderRef!: ElementRef;
  @ViewChild('travelArticlesRef', { static: true })
  travelArticlesRef!: ElementRef;
  @ViewChild('testimonialsRef', { static: true }) testimonialsRef!: ElementRef;

  protected icon = inject(SvgIcons);

  hotelRooms = [
    {
      title: 'Budget-Friendly Hotels ',
      description: '89 Hotels Available  ',
      image: 'assets/images/hotel/rooms/executive_suites.webp',
    },
    {
      title: 'Luxury Stays ',
      description: '122 Hotels Available ',
      image: 'assets/images/hotel/rooms/premium_sea_view_rooms.webp',
    },
    {
      title: 'Family-Friendly Hotels ',
      description: '95 Hotels Available ',
      image: 'assets/images/hotel/rooms/heritage_rooms.webp',
    },
    {
      title: 'Extended Stay Hotels ',
      description: '93 Hotels Available ',
      image: 'assets/images/hotel/rooms/luxury_villas.webp',
    },
    {
      title: 'Boutique Hotels ',
      description: '114 Hotels Available ',
      image: 'assets/images/hotel/rooms/family_rooms.webp',
    },
    {
      title: 'Mountain View Rooms ',
      description: '105 Hotels Available ',
      image: 'assets/images/hotel/rooms/standerd_twin_rooms.webp',
    },
    {
      title: 'Sea View Hotels ',
      description: '108 Hotels Available ',
      image: 'assets/images/hotel/rooms/boutique_hotels.webp',
    },
    {
      title: 'Standard Twin Rooms ',
      description: '134 Hotels Available ',
      image: 'assets/images/hotel/rooms/mountain_view_rooms.webp',
    },
  
  ];

  accommodations = [
    {
      title: 'Pod 51 Hotel ',
      image: 'assets/images/hotel/the_roosevelt_inn.webp',
      rating: 4.6,
      reviews: '100k Reviews',
      type: 'Boutique ',
      country: 'New York ',
      seatsLeft: '19 Rooms Left ',
    },
    {
      title: 'The Langham ',
      image: 'assets/images/hotel/crescent_bay_lodge.webp',
      rating: 4.8 ,
      reviews: '85k Reviews',
      type: 'Luxury ',
      country: 'Illinois',
      seatsLeft: '9 Rooms Left',
    },
    {
      title: 'The Driskill Hotel ',
      image: 'assets/images/hotel/magnolia_suites.webp',
      rating: 4.8,
      reviews: '90k Reviews',
      type: 'Luxury ',
      country: 'Texas',
      seatsLeft: '10 Rooms Left',
    },
    {
      title: 'Super 8 by Wyndham Redding',
      image: 'assets/images/hotel/blue_ridge_retreat.webp',
      rating: 4.4,
      reviews: '95k Reviews',
      type: 'Budget ',
      country: 'North Carolina ',
      seatsLeft: '7 Rooms Left',
    },
    {
      title: 'Motel 6 Portland Central ',
      image: 'assets/images/hotel/the_golden_arch_hotel.webp',
      rating: 4.9,
      reviews: '85k Reviews',
      type: 'Budget ',
      country: 'Oregon ',
      seatsLeft: '12 Rooms Left ',
    },
    {
      title: 'Fairmont Banff Springs ',
      image: 'assets/images/hotel/willow_creek_stay.webp',
      rating: 4.3,
      reviews: '75k Reviews',
      type: 'Luxury ',
      country: 'Canada ',
      seatsLeft: '16 Rooms Left ',
    },
    // Add more entries as needed
  ];

  recommendedProducts = [
    {
      image: 'assets/images/hotel/parisfrance.webp',
      title: 'Venice, Italy ',
      duration: '3 Days 2 Nights ',
      rating: 4.7,
      details: {
        flights: 'Canal View',
        hotels: 'Breakfast',
        transfers: 'Near Vaporetto',
        activities: 'Parisian Charm',
      },
      description: [
        'Romantic gondola views ',
        'Close to St. Mark’s Square',
        'Doge’s Palace tickets on request',
      ],
      price: 78952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/bali_indonesia.webp',
      title: 'Barcelona, Spain ',
      duration: '3 Days 2 Nights ',
      rating: 4.7,
      details: {
        flights: 'City Beach View',
        hotels: 'Breakfast',
        transfers: 'Near Metro',
        activities: 'Near Ubud',
      },
      description: [
        'Stunning Gaudí architecture',
        ' Close to La Rambla',
        'Sagrada Família tickets on request ',
      ],
      price: 68952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/zurich_switzerland.webp',
      title: 'Tokyo, Japan ',
      duration: '4 Days 3 Nights ',
      rating: 4.5,
      details: {
        flights: 'City Skyline View',
        hotels: ' Breakfast',
        transfers: 'Near Subway',
        activities: 'Old Town',
      },
      description: [
        'Modern skyscrapers and traditional temples',
        'Close to Shinjuku and Shibuya',
        'Tokyo Tower tickets on request',
      ],
      price: 85952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/dubai_uae.webp',
      title: 'Paris, France ',
      duration: '3 Days 2 Nights ',
      rating: 4.0,
      details: {
        flights: 'Eiffel Tower View ',
        hotels: 'Breakfast',
        transfers: 'Near Metro',
        activities: 'Metro Access',
      },
      description: [
        'Iconic cityscape and romantic ambiance',
        'Close to Notre Dame and the Louvre',
        'Eiffel Tower tickets on request',
      ],
      price: 78952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/rome_italy.webp',
      title: 'Sydney, Australia ',
      duration: '4 Days 3 Nights ',
      rating: 4.2,
      details: {
        flights: 'Harbor View',
        hotels: 'Breakfast',
        transfers: 'Near Circular Quay ',
        activities: 'Metro Access',
      },
      description: [
        'Opera House and Harbor Bridge views',
        'Close to Bondi Beach ',
        'Sydney Opera House tickets on request',
      ],
      price: 78952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/kuala_lumpur_malaysia.webp',
      title: 'New York City, USA ',
      duration: '3 Days 2 Nights ',
      rating:  4.7 ,
      details: {
        flights: 'Skyline View',
        hotels: 'Breakfast',
        transfers: 'Near Subway',
        activities: 'LRT Nearby',
      },
      description: [
        'Manhattan skyline and Times Square',
        'Empire State Building tickets on request ',
        // 'Complimentary welcome drink',
      ],
      price: 68952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/santorini_greece.webp',
      title: 'Bangkok, Thailand ',
      duration: '4 Days 3 Nights ',
      rating: 4.6,
      details: {
        flights: 'City Temple View',
        hotels: 'Breakfast',
        transfers: 'Near BTS Skytrain',
        activities: 'Infinity Pool',
      },
      description: [
        'Grand Palace and Wat Arun views ',
        'Close to shopping districts',
        'Grand Palace tickets on request',
      ],
      price: 5952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/bangkok_thailand.webp',
      title: 'Dubai, UAE ',
      duration: '4 Days 3 Nights ',
      rating: 4.5,
      details: {
        flights: 'Desert View',
        hotels: 'Breakfast',
        transfers: 'Near Dubai Mall ',
        activities: 'Night Market',
      },
      description: [
        'Burj Khalifa and Dubai Fountain',
        'Close to shopping and entertainment districts ',
        'Burj Khalifa tickets on request',
      ],
      price: 58952,
      originalPrice: 88952,
      link: '#',
    },
  ];

  testimonials = [
    {
      id: 1,
      title: 'Awesome Services ',
      description:
        '“I had a trip to Canada. I was looking for a budget-friendly stay. {{companyName}} helped me find the best hotels in Canada. I booked my stay with them and everything was super easy. Highly appreciate their service!” ',
      clientName: 'Emily Johnson, Dallas ',
      // clientDesignation: 'ddd',
      clientAvatar: 'https://i.pravatar.cc/40?img=1',
    },
    {
      id: 2,
      title: 'Outstanding Experience ',
      description:
        '“Booking my hotel in California was a smooth one. As soon as I called the booking team of [COMPANY_NAME], the entire process was easy. The agent was very polite and helped me get the best stay. Thanks a lot!” ',
      clientName: 'Sarah Davis, Charlotte ',
      // clientDesignation: 'Product Manager',
      clientAvatar: 'https://i.pravatar.cc/40?img=2',
    },
    {
      id: 3,
      title: 'Incredible Customer Support ',
      description:
        '“I booked my hotel in New York with [COMPANY_NAME]. I had some confusion regarding the check-in process. I called their customer support team after booking, and they helped me throughout the process. Their team is very efficient and helpful.” ',
      clientName: 'Emma Wilson, Texas ',
      // clientDesignation: 'Tech Lead',
      clientAvatar: 'https://i.pravatar.cc/40?img=3',
    },
    {
      id: 4,
      title: 'Reliable and Efficient ',
      description:
        '“I had a trip with my family to Orlando, and it was a smooth experience with [COMPANY_NAME]. The hotel I booked for my family was close to Disney World. The services as guaranteed at the time of booking were the same. Extremely reliable and trusted.” ',
      clientName: 'Daniel Moore, Colorado ',
      // clientDesignation: 'Business Analyst',
      clientAvatar: 'https://i.pravatar.cc/40?img=4',
    },
    {
      id: 5,
      title: 'Made Business Travel Easy ',
      description:
        '“Booked a room in Dubai for my business trip with [COMPANY_NAME]. From the very first, the company helped me a lot. They guided me in booking the best hotel with exclusive services. It was a memorable experience.” ',
      clientName: 'James Smith, Georgia ',
      // clientDesignation: 'Marketing Director',
      clientAvatar: 'https://i.pravatar.cc/40?img=5',
    },
    {
      id: 6,
      title: 'Highly Recommended ',
      description:
        '“Booking through [COMPANY_NAME] was an amazing experience. I have reserved a hotel in Los Angeles. I got the best deal on my booking and the services provided by the hotel were superb. They made my trip more enjoyable.” ',
      clientName: 'Michael Brown, North Carolina ',
      // clientDesignation: 'Marketing Director',
      clientAvatar: 'https://i.pravatar.cc/40?img=5',
    },
  ];

  travelArticles = [
    {
      image: 'assets/images/hotel/travel-image1.webp',
      badge: 'Trips',
      date: 'April 11, 2025',
      author: 'Olivia Martinez',
      title: 'Cheap Business Class Flights – Book Luxury Travel on Budget',
    },
    {
      image: 'assets/images/hotel/cheap_international_flights.webp',
      badge: 'Trips',
      date: 'August 06, 2025',
      author: 'Marcus Bennett',
      title: 'Cheap International Flights from the US – Full Guide',
    },
    {
      image: 'assets/images/hotel/the_first_class_advantage_in_beating_jet_lag.webp',
      badge: 'Trips',
      date: 'Feb 12, 2025',
      author: 'Isabella Chen',
      title: 'The First Class Advantage in Beating Jet Lag',
    },
    {
      image: 'assets/images/hotel/business_class_flights_deals.webp',
      badge: 'Trips',
      date: 'April 06, 2025',
      author: 'Ethan Reynolds',
      title: 'Business Class Flights deals: Booking Secrets And Tips',
    },
    {
      image: 'assets/images/hotel/catch_the_summer_festival_fun_with_cheap_domestic_flights.webp',
      badge: 'Trips',
      date: 'June 08, 2025',
      author: 'Sophia Patel',
      title: 'Catch the Summer Festival Fun with Cheap Domestic Flights',
    },
    {
      image: 'assets/images/hotel/sustainable_travel_how_business_class_flights_ensure_it.webp',
      badge: 'Trips',
      date: 'May 16, 2025',
      author: 'Liam Gallagher',
      title: 'Sustainable Travel: How Business Class Flights Ensure It?',
    },
  ];
  constructor(
        private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    // Company Name Get
    const data = this.shareService.getcompanyName();
    this.companyName = data.companyName;
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
    this.testimonials.forEach(testimonial => {
    testimonial.description = testimonial.description
      .replace('{{companyName}}', this.companyName)
      .replace('[COMPANY_NAME]', this.companyName);
       });
  }

  ngAfterViewInit(): void {
    const swiperEl: any = this.hotelRoomsSwiperRef.nativeElement;
    const swiperEl2: any = this.recoendSwiperRef.nativeElement;
    const swiperEl3: any = this.travelArticlesRef.nativeElement;
    const swiperEl4: any = this.testimonialsRef.nativeElement;
    const swiperEl5: any = this.accomodationSliderRef.nativeElement;

    customElements.whenDefined('swiper-container').then(() => {
      // Set params BEFORE initializing
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
        },
      };
      const swiperParams1 = {
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
      const swiperParams2 = {
        slidesPerView: 4,
        spaceBetween: 12,
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
        },
      };
      const swiperParams3 = {
        effect: 'cards',
        grabCursor: true,
        shadow: false,
        slideShadows: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        loop: false,
      };

      Object.assign(swiperEl, swiperParams);
      Object.assign(swiperEl2, swiperParams1);
      Object.assign(swiperEl3, swiperParams2);
      Object.assign(swiperEl4, swiperParams3);
      Object.assign(swiperEl5, swiperParams1);
      // and now initialize it
      swiperEl.initialize();
      swiperEl2.initialize();
      swiperEl3.initialize();
      swiperEl4.initialize();
      swiperEl5.initialize();
    });
  }
}
