import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MainFilterComponent } from '../../components/main-filter/main-filter.component';
import { NgFor } from '@angular/common';
import { SvgIcons } from '../../shared/svg-icons';

@Component({
  selector: 'app-cruise',
  imports: [MainFilterComponent, NgFor],
  templateUrl: './cruise.component.html',
  styleUrl: './cruise.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CruiseComponent implements OnInit {
  @ViewChild('cruiseTypesSwiperRef', { static: true })
  cruiseTypesSwiperRef!: ElementRef;
  @ViewChild('cruisesSwiperRef', { static: true })
  cruisesSwiperRef!: ElementRef;
  @ViewChild('travelFeaturesSwiperRef', { static: true })
  travelFeaturesSwiperRef!: ElementRef;
  @ViewChild('popularTripsRef', { static: true }) popularTripsRef!: ElementRef;

  protected icons = inject(SvgIcons);

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  cruiseTypes = [
    {
      title: 'MSC Cruises',
      description: '16 Cruises',
      image: 'assets/images/cruise/cruise-type/msc_cruise.webp',
    },
    {
      title: 'Royal Caribbean International',
      description: '18 Cruises',
      image: 'assets/images/cruise/cruise-type/royal_caribbean_international.webp',
    },
    {
      title: 'Princess Cruises',
      description: '221 Cruises',
      image: 'assets/images/cruise/cruise-type/princess_cruises.webp',
    },
    {
      title: 'Carnival Cruise Line',
      description: '25 Cruises',
      image: 'assets/images/cruise/cruise-type/carnival_cruise_line.webp',
    },
    {
      title: 'Celebrity Cruises',
      description: '16 Cruises',
      image: 'assets/images/cruise/celebrity_cruises.webp',
    },
    {
      title: 'Costa Cruises',
      description: '22 Cruises',
      image: 'assets/images/cruise/cruise-type/costa_cruise.webp',
    },
    {
      title: 'Holland America Line',
      description: '6 Cruises',
      image: 'assets/images/cruise/cruise-type/holland_america_cruise.webp',
    },
    {
      title: 'Disney Cruise Line',
      description: '20 Cruises',
      image: 'assets/images/cruise/cruise-type/disney_cruise_line.webp',
    },
    {
      title: 'Viking Ocean Cruises',
      description: '26 Cruises',
      image: 'assets/images/cruise/cruise-type/viking_ocean_cruises.webp',
    },
  ];
  cruises = [
    {
      title: 'MSC Bellissima',
      location: 'Barcelona Cruise Port, Spain',
      width: '43m',
      speed: '22 knots',
      price: '6,952',
      seats: '15',
      rating: '4.7',
      image: 'assets/images/cruise/msc_bellissima.webp',
      sticker: 'Cheapest',
    },
    {
      title: 'Costa Toscana',
      location: 'Civitavecchia Port, Rome, Italy',
      width: '42m',
      speed: '23 knots',
      price: '7,552',
      seats: '12',
      rating: '4.8',
      image: 'assets/images/cruise/costa_toscana.webp',
      sticker: 'Cheapest',
    },
    {
      title: 'Norwegian Bliss',
      location: 'Seattle Cruise Terminal, USA',
      width: '41.5m',
      speed: '23 knots',
      price: '8,552',
      seats: '10',
      rating: '4.5',
      image: 'assets/images/cruise/norwegian_bliss.webp',
      sticker: 'Cheapest',
    },
    {
      title: 'Celebrity Edge',
      location: 'Fort Lauderdale Port Everglades, USA',
      width: '39m',
      speed: '22 knots',
      price: '9,452',
      seats: '9',
      rating: '4.6',
      image: 'assets/images/cruise/celebrity_edge.webp',
      sticker: 'Cheapest',
    },
    {
      title: 'Regal Princess',
      location: 'Southampton Cruise Terminal, UK',
      width: '38m',
      speed: '22 knots',
      price: '7,552',
      seats: '11',
      rating: '4.4',
      image: 'assets/images/cruise/regal_princess.webp',
      sticker: 'Cheapest',
    },

    // Add more cruise objects as needed
  ];
  travelFeatures = [
    {
      icon: this.icons.worldCoverage,
      title: 'Worldwide Access',
      description: 'Your passport to endless destinations',
    },
    {
      icon: this.icons.flexibility,
      title: 'Total Freedom',
      description: 'Change, cancel or customize anytime',
    },
    {
      icon: this.icons.bestSupport,
      title: 'Always-On Support',
      description: 'Day or night, we’re here for you',
    },
    {
      icon: this.icons.guidedTours,
      title: 'Expert-Led Tours',
      description: 'Discover more with local insiders',
    },
  ];
  popularTrips = [
    {
      image: 'assets/images/cruise/popular-card1.webp',
      description: 'Venice > Dubrovnik > Kotor > Venice',
      rating: 4.8,
      price: 7952,
      link: '#',
    },
    {
      image: 'assets/images/cruise/popular-card2.webp',
      description: 'Seattle > Juneau > Skagway > Seattle',
      rating: 4.7,
      price: 6952,
      link: '#',
    },
    {
      image: 'assets/images/cruise/popular-card3.webp',
      description: 'Sydney > Hobart > Melbourne > Sydney',
      rating: 4.6,
      price: 8952,
      link: '#',
    },
    
  ];

  ngOnInit(): void {
    // Set meta tags
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

    // Set additional meta tags for better SEO
    this.meta.updateTag({ name: 'keywords', content: 'cruise vacation, cruise deals, cruise destinations, sea adventures, cruise booking, infinity travel cruises' });
    this.meta.updateTag({ property: 'og:title', content: metaTitle || 'Cruise Vacations - Infinity Travel' });
    this.meta.updateTag({ property: 'og:description', content: metaDescription || 'Discover amazing cruise destinations and deals for your perfect sea adventure.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: metaTitle || 'Cruise Vacations - Infinity Travel' });
    this.meta.updateTag({ name: 'twitter:description', content: metaDescription || 'Discover amazing cruise destinations and deals for your perfect sea adventure.' });
  }

  ngAfterViewInit(): void {
    const swiperEl: any = this.cruiseTypesSwiperRef.nativeElement;
    const swiperEl1: any = this.cruisesSwiperRef.nativeElement;
    const swiperEl2: any = this.travelFeaturesSwiperRef.nativeElement;
    const swiperEl3: any = this.popularTripsRef.nativeElement;

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

      const swiperParams2 = {
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

      const swiperParams3 = {
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
