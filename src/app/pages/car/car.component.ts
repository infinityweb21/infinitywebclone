import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-car',
  imports: [DatePickerModule,InputTextModule,ReactiveFormsModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {
  // Company Name Get
  private shareService: SharedService = inject(SharedService);
  private fb: FormBuilder = inject(FormBuilder);
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
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
