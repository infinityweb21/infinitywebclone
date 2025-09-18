import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FlatpickrDirective } from '../../directives/flatpickr.directive';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
  import { switchMap, finalize } from 'rxjs/operators';
import { SpinnerService } from '../../services/common/spinner.service';

export function pickupBeforeDropoffValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pickupDate = control.get('pickup_date')?.value;
    const pickupTime = control.get('pickup_time')?.value;
    const dropoffDate = control.get('dropoff_date')?.value;
    const dropoffTime = control.get('dropoff_time')?.value;

    if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
      return null; // let required validators handle empties
    }

    const pickup = new Date(`${pickupDate}T${pickupTime}`);
    const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);

    return dropoff > pickup ? null : { dropoffBeforePickup: true };
  };
}
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
  private spinnerService: SpinnerService = inject(SpinnerService);

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

    this.bookingForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        pickup_location: ['', Validators.required],
        dropoff_location: ['', Validators.required],
        pickup_date: [null, Validators.required],
        pickup_time: [null, Validators.required],
        dropoff_date: [null, Validators.required],
        dropoff_time: [null, Validators.required],
      },
      { validators: pickupBeforeDropoffValidator() }
    );
  }



onSubmit(): void {
  if (this.bookingForm.valid) {
    const formData = this.bookingForm.value;

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

    this.spinnerService.show();

    this.carService.createCarBookings(payload).pipe(
      switchMap(() => this.carService.sendEmails(payload)),
      finalize(() => this.spinnerService.hide())
    ).subscribe({
      next: (res) => {
        this.router.navigate(['/thankyou']); 
      },
      error: (error) => {
        console.error('Booking or Email failed:', error);
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

  onTimeSelected(event: { departure: string }, controlName: string) {
    console.log(`Selected time for ${controlName}:`, event.departure);
    this.bookingForm.get(controlName)?.setValue(event.departure);
  }
}
