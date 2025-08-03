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
      title: 'Executive Suites',
      description: '145 Hotels Available',
      image: 'assets/images/hotel/rooms/executive_suites.webp',
    },
    {
      title: 'Premium Sea View Rooms',
      description: '98 Hotels Available',
      image: 'assets/images/hotel/rooms/premium_sea_view_rooms.webp',
    },
    {
      title: 'Heritage Rooms',
      description: '67 Hotels Available',
      image: 'assets/images/hotel/rooms/heritage_rooms.webp',
    },
    {
      title: 'Luxury Villas',
      description: '52 Hotels Available',
      image: 'assets/images/hotel/rooms/luxury_villas.webp',
    },
    {
      title: 'Family Rooms',
      description: '184 Hotels Available',
      image: 'assets/images/hotel/rooms/family_rooms.webp',
    },
    {
      title: 'Standard Twin Rooms',
      description: '213 Hotels Available',
      image: 'assets/images/hotel/rooms/standerd_twin_rooms.webp',
    },
    {
      title: 'Boutique Hotels',
      description: '76 Hotels Available',
      image: 'assets/images/hotel/rooms/boutique_hotels.webp',
    },
    {
      title: 'Mountain View Rooms',
      description: '89 Hotels Available',
      image: 'assets/images/hotel/rooms/mountain_view_rooms.webp',
    },
    {
      title: 'Business Class Rooms',
      description: '134 Hotels Available',
      image: 'assets/images/hotel/rooms/business_class_rooms.webp',
    },
    {
      title: 'Budget-Friendly Stays',
      description: '245 Hotels Available',
      image: 'assets/images/hotel/rooms/budget_friendly_stay.webp',
    },
  ];

  accommodations = [
    {
      title: 'The Roosevelt Inn',
      image: 'assets/images/hotel/the_roosevelt_inn.webp',
      rating: 4.6,
      reviews: '100k Reviews',
      type: 'Luxury',
      country: 'New York',
      seatsLeft: '18 Rooms Left',
    },
    {
      title: 'Crescent Bay Lodge',
      image: 'assets/images/hotel/crescent_bay_lodge.webp',
      rating: 4.5,
      reviews: '85k Reviews',
      type: 'Boutique',
      country: 'California',
      seatsLeft: '9 Rooms Left',
    },
    {
      title: 'Magnolia Suites',
      image: 'assets/images/hotel/magnolia_suites.webp',
      rating: 4.8,
      reviews: '90k Reviews',
      type: 'Business',
      country: 'Texas',
      seatsLeft: '12 Rooms Left',
    },
    {
      title: 'Blue Ridge Retreat',
      image: 'assets/images/hotel/blue_ridge_retreat.webp',
      rating: 4.4,
      reviews: '95k Reviews',
      type: 'Resort',
      country: 'North Carolina',
      seatsLeft: '7 Rooms Left',
    },
    {
      title: 'The Golden Arch Hotel',
      image: 'assets/images/hotel/the_golden_arch_hotel.webp',
      rating: 4.9,
      reviews: '85k Reviews',
      type: 'Heritage',
      country: 'Illinois',
      seatsLeft: '4 Rooms Left',
    },
    {
      title: 'Willow Creek Stay',
      image: 'assets/images/hotel/willow_creek_stay.webp',
      rating: 4.3,
      reviews: '75k Reviews',
      type: 'Family',
      country: 'Oregon',
      seatsLeft: '15 Rooms Left',
    },
    // Add more entries as needed
  ];

  recommendedProducts = [
    {
      image: 'assets/images/hotel/parisfrance.webp',
      title: 'Paris, France',
      duration: '3 Days 2 Nights',
      rating: 4.7,
      details: {
        flights: 'Eiffel View',
        hotels: 'Balcony Breakfast',
        transfers: 'Seine Walks',
        activities: 'Parisian Charm',
      },
      description: [
        'Close to Champs-Élysées',
        'Romantic balcony view',
        'Louvre tickets on request',
      ],
      price: 78952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/bali_indonesia.webp',
      title: 'Bali, Indonesia',
      duration: '4 Days 3 Nights',
      rating: 4.8,
      details: {
        flights: 'Private Pool',
        hotels: 'Jungle View',
        transfers: 'Floating Breakfast',
        activities: 'Near Ubud',
      },
      description: [
        'Tropical garden surroundings',
        'Floating breakfast experience',
        'Balinese massage session',
      ],
      price: 68952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/zurich_switzerland.webp',
      title: 'Zurich, Switzerland',
      duration: '3 Days 2 Nights',
      rating: 4.9,
      details: {
        flights: 'Lake View',
        hotels: 'Alpine Style',
        transfers: 'Free Transit Pass',
        activities: 'Old Town',
      },
      description: [
        'Alps and lake panorama',
        'Chocolate tasting nearby',
        'Local tram access included',
      ],
      price: 85952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/dubai_uae.webp',
      title: 'Dubai, UAE',
      duration: '3 Days 2 Nights',
      rating: 4.6,
      details: {
        flights: 'Burj View',
        hotels: 'Infinity Pool',
        transfers: 'Desert Safari',
        activities: 'Metro Access',
      },
      description: [
        'Desert safari on request',
        'Near Burj Khalifa and malls',
        'Rooftop pool access',
      ],
      price: 78952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/rome_italy.webp',
      title: 'Rome, Italy',
      duration: '3 Days 2 Nights',
      rating: 4.7,
      details: {
        flights: 'Colosseum View',
        hotels: 'Free Breakfast',
        transfers: 'Historic Centre',
        activities: 'Metro Access',
      },
      description: [
        'Near the Colosseum and the Vatican',
        'Evening wine tasting',
        'Rooftop dining views',
      ],
      price: 78952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/kuala_lumpur_malaysia.webp',
      title: 'Kuala Lumpur, Malaysia',
      duration: '3 Days 2 Nights',
      rating: 4.4,
      details: {
        flights: 'Petronas View',
        hotels: 'Rooftop Pool',
        transfers: 'Free Breakfast',
        activities: 'LRT Nearby',
      },
      description: [
        'Steps from the shopping district',
        'Sky bridge access',
        'Complimentary welcome drink',
      ],
      price: 68952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/santorini_greece.webp',
      title: 'Santorini, Greece',
      duration: '4 Days 3 Nights',
      rating: 4.9,
      details: {
        flights: 'Caldera View',
        hotels: 'Cave Suite',
        transfers: 'Sunset Spot',
        activities: 'Infinity Pool',
      },
      description: [
        'Famous blue dome scenery',
        'Private terrace dining',
        'Photo shoot experience',
      ],
      price: 5952,
      originalPrice: 88952,
      link: '#',
    },
    {
      image: 'assets/images/hotel/bangkok_thailand.webp',
      title: 'Bangkok, Thailand',
      duration: '3 Days 2 Nights',
      rating: 4.5,
      details: {
        flights: 'Riverside',
        hotels: 'Street Food',
        transfers: 'Skytrain Nearby',
        activities: 'Night Market',
      },
      description: [
        'Near shopping and nightlife',
        'Thai massage offers',
        'River cruise optional',
      ],
      price: 58952,
      originalPrice: 88952,
      link: '#',
    },
  ];

  testimonials = [
    {
      id: 1,
      title: 'Outstanding Experience',
      description:
        'Thanks to Infinity Travels, my trip to NYC was smooth. I stayed in a beautiful hotel near Times Square with impeccable service and comfortable rooms. It truly enhanced my city experience!',
      clientName: 'Lucas Bennett, London',
      // clientDesignation: 'ddd',
      clientAvatar: 'https://i.pravatar.cc/40?img=1',
    },
    {
      id: 2,
      title: 'Absolutely Worth It',
      description:
        'Booking through Infinity Travels made finding the perfect hotel in LA easy. I had an amazing stay at a boutique hotel near Hollywood, with stylish decor and outstanding hospitality throughout.',
      clientName: 'Elena García, Madrid',
      // clientDesignation: 'Product Manager',
      clientAvatar: 'https://i.pravatar.cc/40?img=2',
    },
    {
      id: 3,
      title: 'Smooth and Reliable',
      description:
        'Our family trip to Orlando was made perfect by Infinity Travels. The hotel was minutes from Disney World, with kid-friendly amenities, spacious rooms, and a welcoming atmosphere. It genuinely felt like home, only in a different place.',
      clientName: 'Omar Al-Farouq, Dubai',
      // clientDesignation: 'Tech Lead',
      clientAvatar: 'https://i.pravatar.cc/40?img=3',
    },
    {
      id: 4,
      title: 'Exceptional Support',
      description:
        'Using Infinity Travels, I found a fantastic hotel in downtown Houston. The affordable rates, spacious rooms, and excellent location made it a perfect choice for work and leisure.',
      clientName: 'Chloe Martin, Toronto',
      // clientDesignation: 'Business Analyst',
      clientAvatar: 'https://i.pravatar.cc/40?img=4',
    },
    {
      id: 5,
      title: 'Incredible Booking Experience',
      description:
        'Booking my hotel in Rome was super easy and quick. The support team was responsive, and the hotel exceeded my expectations. I’ll definitely book my next trip with Infinity Travels!',
      clientName: 'Emily Carter, New York',
      // clientDesignation: 'Marketing Director',
      clientAvatar: 'https://i.pravatar.cc/40?img=5',
    },
    {
      id: 6,
      title: 'Perfect for Business Travel',
      description:
        'Booked a hotel in Singapore for a conference. Everything, from location to amenities, matched perfectly as promised. Fast service, no stress, and a smooth check-in experience.',
      clientName: 'Liam Anderson, Los Angeles',
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
