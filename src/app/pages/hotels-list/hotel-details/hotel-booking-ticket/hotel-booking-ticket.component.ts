import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../../services/hotel/hotel.service';
import { TosterService } from '../../../../services/common/toaster.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hotel-booking-ticket',
  imports: [DatePipe],
  templateUrl: './hotel-booking-ticket.component.html',
  styleUrl: './hotel-booking-ticket.component.scss'
})
export class HotelBookingTicketComponent {
private activateRoute:ActivatedRoute=inject(ActivatedRoute)
private hotelService:HotelService = inject(HotelService)
private toasterService:TosterService=inject(TosterService)
private destroyRef:DestroyRef=inject(DestroyRef)
public hotelDetails:any
public travellers:any[]=[]

private bookingId:string|null=null

ngOnInit(){
  this.activateRoute.paramMap.subscribe(params => {
  this.bookingId = params.get('bookingId');
  if(this.bookingId){
     this.getCustomerBookingDetails(this.bookingId)
  }
  
  
});
}

getNumberOfNight(checkin_date:string, checkout_date:string) {
  const checkin = new Date(checkin_date);
  const checkout = new Date(checkout_date);

  // Calculate the time difference in milliseconds
  const diffTime = checkout.getTime() - checkin.getTime();

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}


getCustomerBookingDetails(bookingId:string){
this.hotelService.getCustomerBookingDetails(bookingId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
  next:(res)=>{
    this.hotelDetails=res?.result?.hotel_details
    this.travellers=res?.result?.passengers
  },
  error:(err)=>{
    this.toasterService.showError("something went wrong while fetching customer booking details")
  }
})
}
downloadTicket(bookingId:string){
  this.hotelService.generateHotelBookingTicket(bookingId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    next:(res:any)=>{
        window.location.href = res?.pdfurl;
    }
  })
}
}
