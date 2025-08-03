import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { FlatpickrDirective } from '../../../directives/flatpickr.directive';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { TosterService } from '../../../services/common/toaster.service';
import { SharedService } from '../../../services/shared/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-hotels-tab',
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    FlatpickrDirective,
    ClickOutsideDirective,
    AutoCompleteModule
  ],
  templateUrl: './hotels-tab.component.html',
  styleUrl: './hotels-tab.component.scss',
})
export class HotelsTabComponent {
  hotelForm: FormGroup;
  showGuestDropdown: boolean = false;
  private searchService = inject(SearchService);
  private toasterService: TosterService = inject(TosterService)
  private sharedService: SharedService = inject(SharedService);
  private router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef)
  public departureAirports: any[] = []
  constructor() {
    this.hotelForm = new FormGroup({
      destination: new FormControl('', [Validators.required]),
      checkInDate: new FormControl('', [Validators.required]),
      checkOutDate: new FormControl('', [Validators.required]),
      rooms: new FormArray([
        new FormGroup({
          adults: new FormControl(2, Validators.min(1)),
          childrens: new FormControl(0, Validators.min(0)),
          childAges: new FormArray([]),
        }),
      ]),
    }, { validators: this.checkDates });
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

  // onCheckInSelected(event: { departure: string }) {
  //   this.hotelForm.get('checkInDate')?.setValue(event.departure);
  // }
  // (dateSelected)="onCheckInSelected($event)"

  // onCheckOutSelected(event: { departure: string }) {
  //   this.hotelForm.get('checkOutDate')?.setValue(event.departure);
  // }
  // (dateSelected)="onCheckOutSelected($event)"

  submitForm() {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
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
    this.searchService.setSearchHotelData(formData);
    this.router.navigate(['/hotels-list']);
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
}
