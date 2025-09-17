import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlatpickrDirective } from '../../directives/flatpickr.directive';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  imports: [DatePickerModule,InputTextModule,ReactiveFormsModule,FlatpickrDirective],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {
  // Company Name Get
  private shareService: SharedService = inject(SharedService);
  private fb: FormBuilder = inject(FormBuilder);
  private carService: CarService = inject(CarService);
  companyName: string = '';
  phoneNumber: string = '';
  getData: any;

  bookingForm!: FormGroup;

  ngOnInit(): void {
    // Company Name Get
    const data = this.shareService.getcompanyName();
    this.companyName = data.companyName;
    this.phoneNumber = data.phoneNumber;

    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      pickup_location: ['', Validators.required],
      dropoff_location: ['', Validators.required],
      pickup_date: [null, Validators.required],
      pickup_time: [null, Validators.required],
      dropoff_date: [null, Validators.required],
      dropoff_time: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formData = this.bookingForm.value;
      console.log('Form Submitted', formData);
      // You can route or send the data to backend here
      const payload = {
      type: "car",
      origin: formData.pickup_location,       // Mapping from pickup_location
      destination: formData.dropoff_location,  // Mapping from dropoff_location
      fly_date: formData.pickup_date,
      return_date: formData.dropoff_date,
      cxname: formData.name,
      email: formData.email,
      phone: formData.phone,
      altphone: "",                     // Can be extended if you collect this info
      website: "theinfinitytravel",     // Static or dynamic if needed
      name_on_card: "",        // Replace with actual input if necessary
      card_number: "",  // Replace with actual input if necessary
      card_exp_month: "",              // Replace with actual input if necessary
      card_exp_year: "",            // Replace with actual input if necessary
      card_cvv: "",                  // Replace with actual input if necessary
      address: "",               // Replace with actual input if necessary
      city: "",                  // Replace with actual input if necessary
      state: "",                      // Replace with actual input if necessary
      country: "",                    // Replace with actual input if necessary
      postcode: ""                // Replace with actual input if necessary
    };

    this.carService.createCarBookings(payload).subscribe({
      next: (response) => {
        console.log('Booking successful:', response);
       
      },
      error: (error) => {
        console.error('Booking failed:', error);
        // Optionally show an error message to the user
      }
    });
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  onDatesSelected(event: any, controlName: string): void {
  console.log(`Date selected for ${controlName}:`, event);

  // Update only the targeted form control
  this.bookingForm.get(controlName)?.setValue(event.departure);
}

}
