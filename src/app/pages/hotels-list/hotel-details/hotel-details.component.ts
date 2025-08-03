import { Component, DestroyRef, ElementRef, inject, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../services/hotel/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RatingModule } from 'primeng/rating';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { MapModule } from '../../../core/map/map.module';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-hotel-details',
  imports: [RatingModule,CommonModule,CurrencyPipe,FormsModule,GalleriaModule,FormsModule,DialogModule,TitleCasePipe,AccordionModule,MapModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss',
  
})
export class HotelDetailsComponent {
  loading:boolean = true;
  private router: Router= inject(Router);
  private activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private hotelService:HotelService = inject(HotelService)
  private toasterService:ToastrService = inject(ToastrService);

  private destroyRef:DestroyRef = inject(DestroyRef);
  @ViewChild('location') locationSection!: ElementRef;

  public hotelDetails:any;
  fallbackImage = 'assets/fallback.jpg';
  selectedRateId:string=''
  searchRequestId:string=''
  chunkedAmenities: string[][] = [];
  rooms:any[]=[]
  lat: number = 0;
  roomRateDetails:boolean=false
  lng: number = 0;
  lowestBaseFare:any;
  amenityChunks: string[][] = [];
  selectedRoom: any = null;
  selectedRate:any=null;
  hotelId:string='';
 
    displayBasic: boolean =false;
   responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
  ngOnInit() {
   this.activatedRoute.queryParams.subscribe(params => {
    console.log('params',params);
    this.selectedRateId=params['rateId']
    this.searchRequestId=params['requestId']
      const hotelId = params['hotelId'];
      this.hotelId=params['hotelId']
      if(hotelId){
       
      }
      if(hotelId && this.selectedRateId,this.searchRequestId){
         this.fetchHotelAndRoomDetails(this.selectedRateId, hotelId, this.searchRequestId);
      }
    })
  }
   
  scrollToLocation() {
    this.locationSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
 get entries() {
    return Object.entries(this.hotelDetails?.descriptions);
  }
showDialog() {
        this.roomRateDetails = true;
    }


 chunkArray(arr: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }


private fetchHotelAndRoomDetails(rateId: string, hotelId: string, requestId: string): void {
  const hotelDetailsPayload = {
    hotelId,
    lang: 'en'
  };

  const hotelRoomsPayload = {
    searchRequestId: requestId,
    propertyId: hotelId,
    selectedRateId: rateId,
    language: 'en-US'
  };

  forkJoin({
    hotelDetails: this.hotelService.hotelDetails(hotelDetailsPayload),
    rooms: this.hotelService.hotelRooms(hotelRoomsPayload)
  })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: ({ hotelDetails, rooms }) => {
        // Hotel details logic
        this.hotelDetails = hotelDetails?.data;
        if (this.hotelDetails?.facilities) {
          const chunkSize = Math.ceil(this.hotelDetails.facilities.length / 3);
          this.amenityChunks = this.chunkArray(this.hotelDetails.facilities, chunkSize);
        }

        // Rooms logic
        this.rooms = rooms?.data?.rooms;
        this.lowestBaseFare = this.getLowestBaseFare(this.rooms);
      },
      error: (err) => {
        this.toasterService.error(err?.error?.message || "Something went wrong while fetching hotel/room details");
      }
    });
}
getLowestBaseFare(roomsData:any) {
  let lowestFare = Infinity;
  let lowestFareRate = null;
 

  roomsData.forEach((room:any) => {
    room.rateList.forEach((rate:any) => {
      if (rate.perNightBaseFare < lowestFare) {
     
        lowestFare = rate.perNightBaseFare;
        lowestFareRate = rate;
      }
    });
  });

  return {
    lowestFare,
    rateDetails: lowestFareRate
  };
}
  navigateToBooking(rate:any,room:any) {
    // Implement navigation logic here
   const selectedRoom={
    selectedRoom:room,
    selectedRate:rate,
    hotelDetails:this.hotelDetails
   }
    this.hotelService.setSearchData(selectedRoom)
    this.router.navigate(['/hotel-booking'],{ queryParams: { hotelId:this.hotelId,requestId: this.searchRequestId,rateId:rate.rateId,roomId:room.roomId}});
  }
    getRating(rating:any){
    return parseFloat(rating)
  }
  get firstDescription(): string | null {
  const descriptions = this.hotelDetails?.descriptions;
  if (descriptions) {
    const firstKey = Object.keys(descriptions)[0];
    return descriptions[firstKey];
  }
  return null;
}
}
