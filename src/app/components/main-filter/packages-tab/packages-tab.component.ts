import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FlatpickrDirective } from '../../../directives/flatpickr.directive';
import { Package } from '../../../core/enums/package.enum';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';

@Component({
  selector: 'app-packages-tab',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlatpickrDirective,
    ClickOutsideDirective,
  ],
  templateUrl: './packages-tab.component.html',
  styleUrl: './packages-tab.component.scss',
})
export class PackagesTabComponent {
  @Output() packageSubmittedForm = new EventEmitter<any>();
  Package = Package;
  public activePackage: Package = Package.FlightHotel;

  flightHotelForm!: FormGroup;
  flightCarForm!: FormGroup;
  public showDropdown: boolean = false;
  selectedAdults: number = 1;
  selectedChildren: number = 1;
  selectedInfants: number = 0;

  adultsList = Array.from({ length: 9 }, (_, i) => i + 1);
  childrenList = Array.from({ length: 8 }, (_, i) => i + 1);
  infantsList = Array.from({ length: 5 }, (_, i) => i);

  selectedCabin = { name: 'Economy', value: 'Economy' };

  cabinOptions = [
    { name: 'Economy', value: 'Economy' },
    { name: 'Premium Economy', value: 'Premium_Economy' },
    { name: 'Business', value: 'Business' },
    { name: 'First', value: 'First' },
  ];
  inputValue: string = '';

  ngOnInit(): void {
    this.flightHotelForm = new FormGroup({
      packageTripType: new FormControl('roundTrip'),
      departure: new FormControl(''),
      arrival: new FormControl(''),
      departureDate: new FormControl(''),
      arrivalDate: new FormControl(''),
      adults: new FormControl(this.selectedAdults),
      children: new FormControl(this.selectedChildren),
      infants: new FormControl(this.selectedInfants),
      cabin: new FormControl(this.selectedCabin),
      multiCitySegments: new FormArray([]),
    });

    this.flightCarForm = new FormGroup({
     
    });
    this.updateInput();
  }

  get multiCitySegments(): FormArray {
    return this.flightHotelForm.get('multiCitySegments') as FormArray;
  }
   onMultiCityDateSelected(event: { departure: string }, index: number): void {
    const segmentGroup = this.multiCitySegments.at(index) as FormGroup;
    segmentGroup.get('departureDate')?.setValue(event.departure);
  }

  addSegment(): void {
    const segmentGroup = new FormGroup({
      departure: new FormControl(''),
      arrival: new FormControl(''),
      departureDate: new FormControl(''),
    });

    this.multiCitySegments.push(segmentGroup);
  }

  removeSegment(index: number): void {
    this.multiCitySegments.removeAt(index);
  }

  clearSegments(): void {
    this.multiCitySegments.clear();
  }

  onDatesSelected(event: { departure: string; arrival?: string }) {
    this.flightHotelForm.get('departureDate')?.setValue(event.departure);
    this.flightHotelForm.get('arrivalDate')?.setValue(event.arrival || '');
  }
  setActiveTab(tab: Package): void {
    this.activePackage = tab;
  }
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  selectPassenger(
    type: 'adult' | 'child' | 'infant',
    count: number,
    event: Event
  ) {
    event.stopPropagation();
    if (type === 'adult') {
      this.selectedAdults = count;
      this.flightHotelForm.get('adults')?.setValue(count);
    } else if (type === 'child') {
      this.selectedChildren = count;
      this.flightHotelForm.get('children')?.setValue(count);
    } else if (type === 'infant') {
      this.selectedInfants = count;
      this.flightHotelForm.get('infants')?.setValue(count);
    }
    this.updateInput();
  }

  updateInput() {
    const total =
      this.selectedAdults + this.selectedChildren + this.selectedInfants;

    const selectedCabin = this.flightHotelForm?.get('cabin')?.value;
    this.selectedCabin = selectedCabin;

    this.inputValue = `${total} Passenger${total !== 1 ? 's' : ''} ${
      selectedCabin?.name
    }`;
  }
  compareCabins = (c1: any, c2: any) => c1?.value === c2?.value;

  searchFlightHotel(): void {
    if (this.activePackage === Package.FlightHotel) {
      this.packageSubmittedForm.emit(this.flightHotelForm.value);
    } else {
      this.packageSubmittedForm.emit(this.flightCarForm.value);
    }
  }
}
