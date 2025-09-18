import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FlatpickrDirective } from '../../directives/flatpickr.directive';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  imports: [
    DatePickerModule,
    InputTextModule,
    ReactiveFormsModule,
    FlatpickrDirective,
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {
  // Company Name Get
  private shareService: SharedService = inject(SharedService);
  private fb: FormBuilder = inject(FormBuilder);
  private carService: CarService = inject(CarService);

  private router: Router = inject(Router);

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

    // Combine date + time into a single ISO string or custom format
    const pickupDateTime = `${formData.pickup_date} ${formData.pickup_time}`;
    const dropoffDateTime = `${formData.dropoff_date} ${formData.dropoff_time}`;

    const payload = {
      type: 'car',
      origin: formData.pickup_location,
      destination: formData.dropoff_location,
      fly_date: pickupDateTime,  
      return_date: dropoffDateTime,
      cxname: formData.name,
      email: formData.email,
      phone: formData.phone,
      altphone: '',
      website: 'theinfinitytravel',
      name_on_card: '',
      card_number: '',
      card_exp_month: '',
      card_exp_year: '',
      card_cvv: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postcode: '',
    };

    console.log('Payload:', payload);
    
    this.carService.createCarBookings(payload).subscribe({
      next: (response) => {
        console.log('Booking successful:', response);
        this.sendEmail(payload);
        this.router.navigate(['/thankyou']);
      },
      error: (error) => {
        console.error('Booking failed:', error);
      },
    });
  } else {
    this.bookingForm.markAllAsTouched();
  }
}


sendEmail(payload: any): void {
  this.carService.sendEmails(payload).subscribe({
    next: (res) => {
      console.log('Email sent successfully:', res);
    },
    error: (err) => {
      console.error('Email sending failed:', err);
    }
  });
}

  onDatesSelected(event: any, controlName: string): void {
    console.log(`Date selected for ${controlName}:`, event);

    // Update only the targeted form control
    this.bookingForm.get(controlName)?.setValue(event.departure);
  }

  onTimeSelected(event: { departure: string }, controlName: string) {
  console.log(`Selected time for ${controlName}:`, event.departure);
  this.bookingForm.get(controlName)?.setValue(event.departure);
}

}
