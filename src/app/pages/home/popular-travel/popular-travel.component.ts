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
import { SharedService } from '../../../services/shared/shared.service';

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
      description: 'Paris > Lucerne > Venice > Rome – A Classic Europe Voyage ',
      rating: 4.9,
      price: 8852,
      link: '#',
      days: 5,
    },
    {
      image: 'assets/images/home/banff_canada.webp',
      description: 'Tokyo > Kyoto > Osaka – Discover Japan Spirit & Skyline ',
      rating: 4.8,
      price: 1052,
      link: '#',
      days: 9,
    },
    {
      image: 'assets/images/home/miami.webp',
      description: 'Cairo > Luxor > Giza – Egypt Chronicles Expedition ',
      rating: 4.6,
      price: 9952,
      link: '#',
      days: 7,
    },
    {
      image: 'assets/images/home/singapore.webp',
      description:
        'Cape Town > Garden Route > Sun City – South Africa Wild Luxe ',
      rating: 4.7,
      price: 7952,
      link: '#',
      days: 6,
    },
    {
      image: 'assets/images/home/newyork.webp',
      description:
        'Reykjavik > Golden Circle > Northern Lights – Iceland Arctic Escape ',
      rating: 4.9,
      price: 8852,
      link: '#',
      days: 7,
    },

    {
      image: 'assets/images/home/tokyo.webp',
      description: 'Bali > Gili Islands > Ubud – Indonesia Island Bliss ',
      rating: 4.7,
      price: 8052,
      link: '#',
      days: 9,
    },

    {
      image: 'assets/images/home/maldives.webp',
      description:
        'London > Edinburgh > Dublin – Royal Castles & Celtic Trails ',
      rating: 4.6,
      price: 7852,
      link: '#',
      days: 8,
    },
  ];

  travelFeatures = [
    {
      icon: 'assets/images/home/best_price_guarantee.svg',
      title: 'Unbeatable Travel Deals',
      description: 'Access exclusive prices tailored for smart travelers',
    },
    {
      icon: 'assets/images/home/global_travel_option.svg',
      title: 'Worldwide Destinations',
      description: 'Discover top-rated getaways across every continent',
    },
    {
      icon: 'assets/images/home/24.7.svg',
      title: '24/7 Expert Assistance',
      description: 'Get round-the-clock travel support whenever you need it',
    },
    {
      icon: 'assets/images/home/secure_payment.svg',
      title: 'Secure & Hassle-Free Payments',
      description: 'Book with confidence using trusted, encrypted systems',
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
    },
  ];

  testimonials: Testimonial[] = [
    {
      id: 1,
      title: 'Saved me time and money',
      description:
        'I used [COMPANY_NAME] to plan a last-minute trip to Miami, and I honestly don’t know how I ever booked trips before. They found me a better deal than what I saw on other sites, and everything, from flights to hotel, was smooth. Definitely using them again.',
      clientName: '— Jessica Reynolds., Atlanta, GA',
      // clientDesignation: 'Web Designer',
      clientAvatar: 'https://i.pravatar.cc/40?img=1',
    },
    {
      id: 2,
      title: 'Customer service is top-tier',
      description:
        "Their team's responsiveness was what most impressed me. I had a question about my booking late at night, and someone actually got back to me within 10 minutes. You don’t get that level of service everywhere.",
      clientName: '— Mark Donovan, Chicago, IL',
      // clientDesignation: 'Product Manager',
      clientAvatar: 'https://i.pravatar.cc/40?img=9',
    },
    {
      id: 3,
      title: 'Perfect for family trips',
      description:
        'We booked our Disney vacation through [COMPANY_NAME], and they handled everything — flights, hotel, park tickets. They even gave us great tips for saving money in Orlando. Super helpful and affordable.',
      clientName: '— Tina Schwart, Denver, CO',
      // clientDesignation: 'Tech Lead',
      clientAvatar: 'https://i.pravatar.cc/40?img=3',
    },
    {
      id: 4,
      title: 'Finally, a travel site that doesn’t feel sketchy',
      description:
        '[COMPANY_NAME] felt trustworthy from the start. The prices were transparent, no weird hidden fees, and the booking process was quick. I booked a trip to Cancun, and everything went exactly as planned.',
      clientName: '— Anthony Moore, Phoenix, AZ',
      // clientDesignation: 'Business Analyst',
      clientAvatar: 'https://i.pravatar.cc/40?img=12',
    },
    {
      id: 5,
      title: 'They actually listen to what you want',
      description:
        'I was planned a honeymoon trip to Italy and had certain very particular requirements. The [COMPANY_NAME] team didn’t just throw random travel plan at me, they actually tailored something around my budget and wishlist. That meant a lot.',
      clientName: '— Laura Patterson, Boston, MA',
      // clientDesignation: 'Marketing Director',
      clientAvatar: 'https://i.pravatar.cc/40?img=5',
    },
    {
      id: 6,
      title: 'Deals you won’t find anywhere else',
      description:
        'I compared prices across at least five other travel sites before landing on [COMPANY_NAME], and they really did offer a better deal for my New York trip. Flights and hotel in one package. Couldn’t beat it.',
      clientName: '— Daniel Harris, Seattle, WA',
      // clientDesignation: 'Product Manager',
      clientAvatar: 'https://i.pravatar.cc/40?img=8',
    },
    {
      id: 7,
      title: 'Easy, fast, and no surprises',
      description:
        'The entire experience, from browsing to checkout, was simple. No last-minute changes or confusing fine print. Just booked my Vegas trip and already looking at their Europe deals.',
      clientName: '— Rachel Willams, Austin, TX',
      // clientDesignation: 'Product Manager',
      clientAvatar: 'https://i.pravatar.cc/40?img=10',
    },
  ];

  travelArticles = [
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
      title:
        'A Comprehensive Guide to Premium Economy and Business Class Flights',
    },
  ];
  private shareService: SharedService = inject(SharedService);
  getData: any = '';
  ngOnInit() {
    this.getData = this.shareService.getcompanyName();
  }

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
