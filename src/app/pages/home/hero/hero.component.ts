import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Destination } from '../../../core/models/destination.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MainFilterComponent } from "../../../components/main-filter/main-filter.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    MainFilterComponent,
    RouterLink
],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent {
  @ViewChild('swiperRef', { static: true }) swiperRef!: ElementRef;
  destinations: Destination[] = [];

  ngOnInit() {
 this.destinations = [
  {
    id: 1,
    name: 'New York City, USA',
    route: '/top-destinations/new-york', // new route
    image: 'assets/images/home/destination-img-1.webp',
    flights: 21,
    hotels: 15,
    cruises: 6,
  },
  {
    id: 2,
    name: 'Bangkok, Thailand',
    route: '/top-destinations/bangkok',
    image: 'assets/images/home/destination-img-2.webp',
    flights: 21,
    hotels: 15,
    cruises: 6,
  },
  {
    id: 3,
    name: 'Sydney, Australia',
    route: '/top-destinations/sydney',
    image: 'assets/images/home/destination-img-3.webp',
    flights: 21,
    hotels: 15,
    cruises: 6,
  },
  {
    id: 4,
    name: 'Kuala Lumpur, Malaysia',
    route: '/top-destinations/kuala-lumpur',
    image: 'assets/images/home/destination-img-4.webp',
    flights: 21,
    hotels: 15,
    cruises: 6,
  },
  {
    id: 5,
    name: 'Zurich, Switzerland',
    route: '/top-destinations/zurich',
    image: 'assets/images/home/destination-img-5.webp',
    flights: 21,
    hotels: 15,
    cruises: 6,
  },
  {
    id: 6,
    name: 'Paris, France',
    route: '/top-destinations/paris',
    image: 'assets/images/home/destination-img-6.webp',
    flights: 21,
    hotels: 15,
    cruises: 6,
  },
  {
    id: 7,
    name: 'Tokyo, Japan',
    route: '/top-destinations/tokyo',
    image: 'assets/images/home/destination-img-7.webp',
    flights: 21,
    hotels: 15,
    cruises: 6,
  },
  {
    id: 8,
    name: 'Amsterdam, Netherlands',
    route: '/top-destinations/amsterdam',
    image: 'assets/images/home/destination-img-8.webp',
    flights: 21,
    hotels: 15,
    cruises: 6,
  }
];

  }
  

  ngAfterViewInit(): void {
    const swiperEl: any = this.swiperRef.nativeElement;

    // Wait for Web Component upgrade to be ready
    customElements.whenDefined('swiper-container').then(() => {
      // Set params BEFORE initializing
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 8,
          },
        },
      };
      Object.assign(swiperEl, swiperParams);
      // and now initialize it
      swiperEl.initialize();
    });
  }
}
