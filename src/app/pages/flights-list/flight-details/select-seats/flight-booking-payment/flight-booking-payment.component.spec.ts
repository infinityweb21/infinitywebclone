import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingPaymentComponent } from './flight-booking-payment.component';

describe('FlightBookingPaymentComponent', () => {
  let component: FlightBookingPaymentComponent;
  let fixture: ComponentFixture<FlightBookingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightBookingPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightBookingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
