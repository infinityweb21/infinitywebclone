import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { SearchService } from '../../services/search.service';
import { FlatpickrDirective } from '../../directives/flatpickr.directive';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotelService } from '../../services/hotel/hotel.service';
import { TosterService } from '../../services/common/toaster.service';
import { SharedService } from '../../services/shared/shared.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-hotels-list',
  imports: [DrawerModule, ReactiveFormsModule, FlatpickrDirective, NgIf, NgFor,AutoCompleteModule,RatingModule,FormsModule,CurrencyPipe,SliderModule,PaginatorModule],
  templateUrl: './hotels-list.component.html',
  styleUrl: './hotels-list.component.scss',
})
export class HotelsListComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  private router: Router = inject(Router);
  private searchService = inject(SearchService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private hotelService:HotelService = inject(HotelService);
    private toasterService:TosterService=inject(TosterService)
  private sharedService:SharedService=inject(SharedService);
  selectedRatings: number[] = [];
  public departureAirports:any[]=[]
  maxBaseFare:number=0
  minBaseFare:number=0
  visible: boolean = false;
  hotelForm: FormGroup;
  showGuestDropdown: boolean = false;
  selectedTab: string = 'recommended';
  properties:any[]=[]
  propertiesAll:any[]=[]
  first = 0;
  itemsPerPage = 10; 
  filteredProperties:any[]=[]
  uniqueRateAmenities: any[] = [];
  count=2


  requestId:string=''
 filters = {
    refundable: false,
    paylater: false,
    breakfast: false,
    hotels: false,
    house: false,
    anyType: true,
    
    propertySearch:'',
    freeCancelation:false,
    petFriendly:false,
    mealsIncluded:false,
    parkingIncluded:false,
  
    rangeValues:[0,0],
    starRatings: [] as number[],
    amenities:[]
  };
 private shareService: SharedService = inject(SharedService);
    getData:any='';
    ngOnInit(){
      this.getData=this.shareService.getcompanyName();
    }
  constructor() {
    this.hotelForm = new FormGroup({
      destination: new FormControl('',[Validators.required]),
      checkInDate: new FormControl('',[Validators.required]),
      checkOutDate: new FormControl('',[Validators.required]),
      rooms: new FormArray([
        new FormGroup({
          adults: new FormControl(2, Validators.min(1)),
          childrens: new FormControl(0, Validators.min(0)),
          childAges: new FormArray([]),
        }),
      ]),
    },
    { validators: this.checkDates }
  );
  

  
    this.searchService.hotelSearchData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      console.log("received data", data);
      this.hotelForm.patchValue({
        destination: data.airportCode,
        checkInDate: data.checkIn,
        checkOutDate: data.checkOut,

      });
      // Update rooms FormArray
      const roomsArray = this.hotelForm.get('rooms') as FormArray;
      roomsArray.clear();
      data.rooms.forEach((room: any) => {
        const childAgesArray = new FormArray(
          (room.childAges || []).map((age: number) => new FormControl(age))
        );
        roomsArray.push(
          new FormGroup({
            adults: new FormControl(room.adults, Validators.min(1)),
            childrens: new FormControl((room.childAges || []).length, Validators.min(0)),
            childAges: childAgesArray,
          })
        );
      });
     
      this.getHotelList(data);
      // this.hotelForm.patchValue(data);
    });
  }
 
 checkDates(group: AbstractControl): ValidationErrors | null {
    const checkIn = group.get('checkInDate')?.value;
    const checkOut = group.get('checkOutDate')?.value;

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkOutDate <= checkInDate) {
        return { checkOutBeforeCheckIn: true };
      }
    }

    return null;
  }


  get rooms(): FormArray {
    return this.hotelForm.get('rooms') as FormArray;
  }

  get childAges(): FormArray[] {
    return this.rooms.controls.map(
      (room) => room.get('childAges') as FormArray
    );
  }

  addRoom(): void {
    this.rooms.push(
      new FormGroup({
        adults: new FormControl(2, Validators.min(1)),
        childrens: new FormControl(0, Validators.min(0)),
        childAges: new FormArray([]),
      })
    );
  }

  removeRoom(index: number): void {
    if (this.rooms.length > 1) {
      this.rooms.removeAt(index);
    }
  }

  changeAdults(roomIndex: number, delta: number): void {
    const room = this.rooms.at(roomIndex) as FormGroup;
    const control = room.get('adults') as FormControl;
    control.setValue(Math.max(1, control.value + delta));
  }

  changeChildren(roomIndex: number, delta: number): void {
    const room = this.rooms.at(roomIndex) as FormGroup;
    const childrenCtrl = room.get('childrens') as FormControl;
    const childAgesArray = room.get('childAges') as FormArray;

    let newCount = Math.max(0, Math.min(2, childrenCtrl.value + delta)); // Max 2
    const currentCount = childrenCtrl.value;

    if (newCount > currentCount) {
      // Add age controls
      for (let i = currentCount; i < newCount; i++) {
        childAgesArray.push(new FormControl(1)); // Default age
      }
    } else if (newCount < currentCount) {
      // Remove from end
      for (let i = currentCount; i > newCount; i--) {
        childAgesArray.removeAt(i - 1);
      }
    }

    childrenCtrl.setValue(newCount);
  }

  updateChildAge(roomIndex: number, childIndex: number, delta: number): void {
    const childAgesArray = this.rooms
      .at(roomIndex)
      .get('childAges') as FormArray;
    const ageCtrl = childAgesArray.at(childIndex) as FormControl;
    const newAge = Math.max(1, Math.min(11, ageCtrl.value + delta));
    ageCtrl.setValue(newAge);
  }

  toggleGuestDropdown() {
    this.showGuestDropdown = !this.showGuestDropdown;
  }

  closeGuestDropdown() {
    this.showGuestDropdown = false;
  }

  get guestSummary(): string {
    const totalRooms = this.rooms.length;
    const totalGuests = this.rooms.controls.reduce((sum, roomGroup) => {
      const room = roomGroup.value;
      return sum + room.adults + room.childrens;
    }, 0);
    return `${totalRooms} Room${totalRooms > 1 ? 's' : ''
      }, ${totalGuests} Traveler${totalGuests > 1 ? 's' : ''}`;
  }

  submitForm() {
    // this.hotelSubmittedForm.emit(this.hotelForm.value);
    if(this.hotelForm.invalid){
    this.hotelForm.markAllAsTouched()
      return
    }
    const formValue = this.hotelForm.value;
    const formData = {
      checkIn: formValue.checkInDate,
      checkOut: formValue.checkOutDate,
      rooms: formValue.rooms.map((room: any) => ({
        adults: room.adults,
        childAges: room.childAges || [],
      })),
      airportCode: formValue.destination,
    };
    console.log(formData);
    this.showGuestDropdown = false;
    
      this.searchService.setSearchHotelData(formData);
  //  this.getHotelList(formData);
    // this.router.navigate(['/hotels-list']);
  }

  private getHotelList(formData:any){

    const payload={
      arrivalDateTime:formData.checkIn,
      departureDateTime:formData.checkOut,
      rooms:formData.rooms.map((room: any) => ({
        AdultPaxCount: room.adults,
        childAges: room.childAges || [],
      })),
      cityId:formData.airportCode.cityid,
      currencyCode:"USD"
    }
   
    this.hotelService.hotelList(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(response)=>{
        console.log("response",response);
        this.requestId=response?.data?.requestId
        this.properties=response?.data?.properties;
        this.propertiesAll=response?.data?.properties
        this.selectTab('recommended')
        this.maxBaseFare = Math.max(...this.properties.map(p => p.fare.base));
        this.minBaseFare = Math.min(...this.properties.map(p => p.fare.base));
        this.filters.rangeValues=[this.minBaseFare,this.maxBaseFare]
        const map = new Map<string, any>();
        this.properties.forEach(hotel => {
        hotel?.fare?.amenities?.forEach((amenity: any) => {
        if (amenity?.name && !map.has(amenity.name)) {
          map.set(amenity.name, amenity);
         }
        });
      });
    this.uniqueRateAmenities = Array.from(map.values());
    console.log("uniqueRateAmenities",this.uniqueRateAmenities);
    
  
        this.applyFilters()
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  navigateToDetails(hotel:any) {
    this.router.navigate(['/hotel-details'],{ queryParams: { hotelId:hotel?.id,requestId: this.requestId,rateId:hotel?.fare?.rateId}});
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    switch(tab){
      case  'recommended':
        this.properties=this.getRecommendedProperties(this.propertiesAll)
        break;
      case 'cheapest'  :
        this.properties = this.getCheapestProperties(this.propertiesAll)
        break;
      default:
        this.properties=this.propertiesAll  
    }
    this.applyFilters()
  }
   filterCountry(event: any): void {
    const query = event.query.toLowerCase();
  
      this.sharedService.cityList(query).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
    
       this.departureAirports = res.data.map((city: any) => ({
      displayName: `${city.cityname} - ${city.country}`,
      cityid: city.cityid,
    
    }));
      },
      error: (err) => {
        this.toasterService.showError(err.error.message || 'Something went wrong while fetching vendor list!')
      }
    })

  }

toggleRating(rating: number): void {
  const index = this.selectedRatings.indexOf(rating);
  if (index === -1) {
    this.selectedRatings.push(rating);
  } else {
    this.selectedRatings.splice(index, 1);
  }

  this.filters.starRatings = [...this.selectedRatings];
  this.applyFilters()

  console.log('Selected Ratings:', this.selectedRatings);
}
 applyFilters() {
    console.log(this.filters);
    const [min, max] = this.filters.rangeValues;
     const selectedAmenities = this.uniqueRateAmenities
    .filter((_, i) => this.filters.amenities[i]);

    // Here, call your filtering logic or emit this object to parent component
    this.filteredProperties=this.properties.filter((property:any)=>{

     
       const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity: any) =>
        property?.fare?.amenities?.some((a: any) => a.name === amenity.name)
      );
      return (this.filters.freeCancelation?(property?.fare?.cancellationFree):(true)) &&
      (this.filters.petFriendly?(property?.fare?.petFriendly):(true)) &&
      (this.filters.mealsIncluded?(property?.fare?.mealsIncluded):(true)) &&
      (this.filters.parkingIncluded?(property?.fare?.parkingIncluded):(true)) &&
      (this.filters.breakfast?(property?.fare?.breakfastIncluded):(true)) &&
      (this.filters.paylater?(property?.fare?.payLater):(true)) &&
      (this.filters.anyType?(true):((this.filters.hotels && this.filters.house)?(property.type==='Hotel' || property.type==='House'):(this.filters.hotels?(property.type==='Hotel'):(property.type==='House')))) &&
      (property.fare.base >= min && property.fare.base <= max) &&
      (this.filters.propertySearch===''?(true):(property.name.toLowerCase().includes(this.filters.propertySearch.toLowerCase()))) &&
      (this.filters.starRatings.length===0?(true):(this.filters.starRatings.includes(property.rating)))
      && matchesAmenities
    })

   
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }
// or any number you want

get paginatedProperties() {
  return this.filteredProperties.slice(this.first, this.first + this.itemsPerPage);
}

onPageChange(event: any) {
  this.first = event.first;
  this.itemsPerPage = event.rows;
   window.scrollTo({ top: 0, behavior: 'smooth' });
}
clearFilter(){
  this.filters = {
    refundable: false,
    paylater: false,
    breakfast: false,
    hotels: false,
    house: false,
    anyType: true,
    
    propertySearch:'',
    freeCancelation:false,
    petFriendly:false,
    mealsIncluded:false,
    parkingIncluded:false,
  
    rangeValues:[this.minBaseFare,this.maxBaseFare],
    starRatings: [] as number[],
    amenities:[]
  };
  this.applyFilters()

}
getRecommendedProperties(properties:any[],minReview: number = 8) {
  return properties.filter(p => p.guestReview >= minReview);
}

getCheapestProperties(properties:any[],count: number = 15) {
  return properties
    .slice()
    .sort((a, b) => a.fare.total - b.fare.total)
    .slice(0, count);
}
}
