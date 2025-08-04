import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewChild } from '@angular/core';
import { MainFilterComponent } from "../../components/main-filter/main-filter.component";
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-top-routes',
  imports: [MainFilterComponent],
  templateUrl: './top-routes.component.html',
  styleUrl: './top-routes.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class TopRoutesComponent {
  @ViewChild('travelFeaturesRef', { static: true })
  travelFeaturesRef!: ElementRef;

   travelFeatures = [
    {
      icon: 'assets/images/home/best_price_guarantee.svg',
      title: 'TRAVEL WITH YOUR BUDGET',
      description: 'It’s time to travel with your own budget and also fulfill all your dreams of flying.',
    },
    {
      icon: 'assets/images/home/global_travel_option.svg',
      title: 'BEST MODE OF COMFORT',
      description: 'Witness that extra dose of comfort as you fly high with us.',
    },
    {
      icon: 'assets/images/home/24.7.svg',
      title: 'EASY BOOKING & PAYMENT',
      description: 'Have the access to the convenient mode of payment for bookings, right now!',
    }
  ];
   ngAfterViewInit(): void {
    const swiperEl1: any = this.travelFeaturesRef.nativeElement;
    

    customElements.whenDefined('swiper-container').then(() => {
      // Set params BEFORE initializing
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
   

      Object.assign(swiperEl1, swiperParams1);
   
      // and now initialize it
      swiperEl1.initialize();
     
    });
  }
   private shareService: SharedService = inject(SharedService);
    getData:any='';
    ngOnInit(){
      this.getData=this.shareService.getcompanyName();
    }
}
