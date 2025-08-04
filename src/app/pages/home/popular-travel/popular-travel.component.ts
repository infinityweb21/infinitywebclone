import { NgFor } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { SvgIcons } from '../../../shared/svg-icons';

interface Testimonial {
  id: number;
  title: string;
  description: string;
  clientName: string;
  // clientDesignation: string;
  clientAvatar: string;
}

@Component({
  selector: 'app-popular-travel',
  imports: [CarouselModule, NgFor],
  templateUrl: './popular-travel.component.html',
  styleUrl: './popular-travel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopularTravelComponent {
  @ViewChild('popularTripsRef', { static: true }) popularTripsRef!: ElementRef;
  @ViewChild('travelFeaturesRef', { static: true })
  travelFeaturesRef!: ElementRef;
  @ViewChild('travelArticlesRef', { static: true })
  travelArticlesRef!: ElementRef;
  @ViewChild('testimonialsRef', { static: true }) testimonialsRef!: ElementRef;

  protected icon = inject(SvgIcons);
  
  popularTrips = [
    {
      image: 'assets/images/home/lasvegas.webp',
      description: 'Las Vegas – Entertainment Escape – Strip Tour, Live Shows, Nightlife',
      rating: 4.6,
      price: 8852,
      link: '#',
      days: 5,
    },
    {
      image: 'assets/images/home/banff_canada.webp',
      description: 'Banff, Canada – Alpine Adventure – Lake Louise, Gondola Ride, Hot Springs',
      rating: 4.7,
      price: 1052,
      link: '#',
       days: 9,
    },
    {
      image: 'assets/images/home/miami.webp',
      description: 'Miami > Nassau > Labadee > Miami Island Hopping Adventure',
      rating: 4.7,
      price: 9952,
      link: '#',
       days: 7,
    },
    {
      image: 'assets/images/home/singapore.webp',
      description: 'Singapore – Fun in Singapore – Sentosa, Universal, Night Safari',
      rating: 4.8,
      price: 7952,
      link: '#',
       days: 6,
    },
    {
      image: 'assets/images/home/newyork.webp',
      description: 'New York – NYC Highlights – Liberty Cruise, Times Square, Broadway',
      rating: 4.5,
      price: 8852,
      link: '#',
      days: 7,
    },
    
    {
      image: 'assets/images/home/tokyo.webp',
      description: 'Tokyo – Tokyo Urban Vibes – Mt. Fuji, Sushi Class, City Tour',
      rating: 4.7,
      price: 8052,
      link: '#',
      days: 9,
    },
    
    {
      image: 'assets/images/home/maldives.webp',
      description: 'Maldives – Lagoon Luxury Stay – Villa Stay, Spa, Dolphin Watching',
      rating: 4.7,
      price: 7852,
      link: '#',
      days: 8,
    }
  ];

  travelFeatures = [
    {
      icon: 'assets/images/home/best_price_guarantee.svg',
      title: 'Best Price Guarantee',
      description: 'Get exclusive deals you won’t find elsewhere',
    },
    {
      icon: 'assets/images/home/global_travel_option.svg',
      title: 'Global Travel Options',
      description: 'Explore popular destinations across the world',
    },
    {
      icon: 'assets/images/home/24.7.svg',
      title: 'Best Support 24/7',
      description: 'Curabitur convallis enim atnora ullamcorper sagittis.',
    },
    {
      icon: 'assets/images/home/secure_payment.svg',
      title: 'Secure Payments',
      description: 'Secure payments with trusted encryption',
    },
    {
      icon: 'assets/images/home/instant_confermation.svg',
      title: 'Instant Confirmation',
      description: 'Receive instant booking confirmations',
    },
    {
      icon: 'assets/images/home/custom_trip_planning.svg',
      title: 'Custom Trip Planning',
      description: 'Customize your trip with flexible options',
    }
  ];

  testimonials: Testimonial[] = [
    {
      id: 1,
      title: 'This is what you call service',
      description:
        'Roman helped me out with a itenary change with a lot of patience and professionalism. When the phone connection abruptly ended he called back. He is my employee of the day. Keep doing a great job.',
      clientName: 'Amanda Reynolds, New York',
      // clientDesignation: 'Web Designer',
      clientAvatar: 'https://i.pravatar.cc/40?img=1',
    },
    {
      id: 2,
      title: 'Philips Help',
      description:
        'Phillip Martin is an outstanding helpful knowledgable and very professional individual he should be seriously consider him for a promotion.',
      clientName: 'David Alan Martell, Mexico',
      // clientDesignation: 'Product Manager',
      clientAvatar: 'https://i.pravatar.cc/40?img=9',
    },
    {
      id: 3,
      title: 'Ryan Wilson was so great to me every',
      description:
        'Ryan Wilson was so great to me every time I spoke with him. He followed up and was so patient and kind. No question — a perfect 10, highly recommend.',
      clientName: 'Ebony Miller, Frankfurt',
      // clientDesignation: 'Tech Lead',
      clientAvatar: 'https://i.pravatar.cc/40?img=3',
    },
    {
      id: 4,
      title: 'Domingue Brown was an Awesome',
      description:
        'Dominguez Brown was an Awesome Coordinator. He helped me in everything that I needed. He is really knowledgable, and I would highly recommend him to anyone who needs assistance. He is also patient& kind. You can Trust him.',
      clientName: 'Thomasea Hall, USA',
      // clientDesignation: 'Business Analyst',
      clientAvatar: 'https://i.pravatar.cc/40?img=12',
    },
    {
      id: 5,
      title: 'Roman was extremely helpful with',
      description:
        'Impressed with the level of professionalism and quality of work. The team was responsive, knowledgeable, and delivered on time.',
      clientName: 'David Wilson',
      // clientDesignation: 'Marketing Director',
      clientAvatar: 'https://i.pravatar.cc/40?img=5',
    },
    {
      id: 6,
      title: 'Excellent Service',
      description:
        'Roman was really helpful in navigating our travel information and seating allocations. Roman even gave me his phone number in case we were disconnected! Very nice indeed.',
      clientName: 'Gail A Greenmun, USA',
      // clientDesignation: 'Product Manager',
      clientAvatar: 'https://i.pravatar.cc/40?img=8',
    },
    {
      id: 7,
      title: 'Spoke to Leon and he handled everything',
      description:
        'Spoke to Leon and he handled everything for me! He got the job done and made it all happen, definitely would recommend him in the future! Thank you Leon, 10 out of 10.',
      clientName: 'Whalen Merrill, USA',
      // clientDesignation: 'Product Manager',
      clientAvatar: 'https://i.pravatar.cc/40?img=10',
    }
  ];

  travelArticles =[
    {
    image: 'assets/images/home/international_flight_booking.webp',
    badge: 'Explore',
    date: 'March 12, 2015',
    author: 'Paul Theroux',
    title: 'Cheap International Flights from the US – Full Guide',
  },
    {
    image: 'assets/images/home/hotel_booking.webp',
    badge: 'Wander',
    date: 'July 8, 2020',
    author: 'Elizabeth Gilbert',
    title: 'Get Hotel Booking Discounts: Easy Steps to Save Big',
  },
    {
    image: 'assets/images/home/hotel_booking2.webp',
    badge: 'Journey',
    date: 'November 23, 2018',
    author: 'Bill Bryson',
    title: 'Book Cheap Domestic Flights: Tips & Deals for USA Travel',
  },
    {
    image: 'assets/images/home/busniess_flight_booking.webp',
    badge: 'Roam',
    date: 'June 1, 2022',
    author: 'Pico Iyer',
    title: 'Business Class Flight Cost, And Upgrade Deals Guide',
  },
    {
    image: 'assets/images/home/flight_booking.webp',
    badge: 'Trek',
    date: 'September 17, 2016',
    author: 'Cheryl Strayed',
    title: 'Cheap International Flights with Layovers save big on Airfare',
  },
    {
    image: 'assets/images/home/travel-image.webp',
    badge: 'Escape',
    date: 'January 4, 2024',
    author: 'Freya Stark',
    title: 'A Comprehensive Guide to Premium Economy and Business Class Flights',
  }
];

  ngAfterViewInit(): void {
    const swiperEl: any = this.popularTripsRef.nativeElement;
    const swiperEl1: any = this.travelFeaturesRef.nativeElement;
    const swiperEl2: any = this.travelArticlesRef.nativeElement;
    const swiperEl3: any = this.testimonialsRef.nativeElement;

    customElements.whenDefined('swiper-container').then(() => {
      // Set params BEFORE initializing
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 3,
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
        slideShadows: false,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        loop: false,
      };

      Object.assign(swiperEl, swiperParams);
      Object.assign(swiperEl1, swiperParams1);
      Object.assign(swiperEl2, swiperParams2);
      Object.assign(swiperEl3, swiperParams3);
      // and now initialize it
      swiperEl.initialize();
      swiperEl1.initialize();
      swiperEl2.initialize();
      swiperEl3.initialize();
    });
  }
}
