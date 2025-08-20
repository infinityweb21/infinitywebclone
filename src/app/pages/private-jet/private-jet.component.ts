import { AuthService } from './../../services/auth.service';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MainFilterComponent } from '../../components/main-filter/main-filter.component';
import { FlightsTabComponent } from '../../components/main-filter/flights-tab/flights-tab.component';
import { SharedService } from '../../services/shared/shared.service';
import { TosterService } from '../../services/common/toaster.service';
import { SpinnerService } from '../../services/common/spinner.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-private-jet',
  imports: [FlightsTabComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './private-jet.component.html',
  styleUrl: './private-jet.component.scss',
})
export class PrivateJetComponent  implements OnInit {
  inquiryForm: FormGroup;
  isSubmitting = false;
  selectedService: string = '';
   getData: any = '';
  private shareService: SharedService = inject(SharedService);
    private route: ActivatedRoute = inject(ActivatedRoute);
      private authService: AuthService = inject(AuthService);
      private destroyRef: DestroyRef = inject(DestroyRef);
        private router: Router = inject(Router);
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private toasterService: TosterService,
    private spinnerService: SpinnerService,
     private meta: Meta,
    private title: Title
  ) {

    this.inquiryForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)],
      ],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


    ngOnInit(): void {
    // Set meta tags
    this.getData = this.shareService.getcompanyName();

    const metaTitle = this.route.snapshot.data['metaTitle'];
    const metaDescription = this.route.snapshot.data['metaDescription'];

    // Set title
    if (metaTitle) {
      this.title.setTitle(metaTitle);
    }

    // Set meta description
    if (metaDescription) {
      this.meta.updateTag({ name: 'description', content: metaDescription });
    }

    // Set additional meta tags for better SEO
    this.meta.updateTag({
      name: 'keywords',
      content:
        'contact us, customer support, travel assistance, infinity travel contact, help desk, travel support',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: metaTitle || 'Contact Us - Infinity Travel',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        metaDescription ||
        'Get in touch with our travel experts for assistance with your booking and travel needs.',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({
      name: 'twitter:title',
      content: metaTitle || 'Contact Us - Infinity Travel',
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content:
        metaDescription ||
        'Get in touch with our travel experts for assistance with your booking and travel needs.',
    });
  }

  onServiceInquiry(serviceName: string) {
    this.selectedService = serviceName;
    console.log('Selected Service:', serviceName);
  }

  onSubmitInquiry() {
    if (this.inquiryForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.spinnerService.show();

      const formData = this.inquiryForm.value;
      const companyData = this.sharedService.getcompanyName();

      // Add selected service to form data
      const submissionData = {
        ...formData,
        selectedService: this.selectedService,
      };

      console.log('formData==========', submissionData);
      console.log('Selected Service Name==========', this.selectedService);

      const emailData = {
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        phone: formData.phone,
        subject: `${this.selectedService}`,
        message: `${formData.message}`,
        // booking_details: `${this.selectedService}`,

        contact_email:'booking@theinfinitytravel.com',
        appName: this.getData?.appName,
        // website: 'https://infinityfarecompare.us/',
      };

      console.log('Selected emaiData Name==========', emailData);

    // const payload = {
    //   name: this.contactForm.value['name'],
    //   email: this.contactForm.value['email'],
    //   phone: this.contactForm.value['phone'].e164Number,
    //   subject: this.contactForm.value['subject'],
    //   message: this.contactForm.value['message'],
    //   contact_email: this.getData.sendmail,
    //   appName: this.getData?.appName,
    // };
  
    this.authService
      .sendEmail(emailData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          this.inquiryForm.reset();
          this.closeModal();
          this.router.navigate(['/thank-you']);
        },
        error: (err) => {
          this.spinnerService.hide();
          this.toasterService.showError(
            err.error.message ||
              'Something went wrong while sending the contact!'
          );
        },
      });

      // Uncomment when ready to send actual emails
      // this.sharedService.sendEmail(emaiData).subscribe({
      //   next: (response) => {
      //     console.log('response', response);

      //     this.toasterService.showSuccess(
      //       `Your inquiry for ${this.selectedService} has been submitted successfully! We will contact you soon.`
      //     );
      //     this.inquiryForm.reset();
      //     this.selectedService = '';
      //     this.closeModal();
      //   },
      //   error: (error) => {
      //     console.error('Error submitting inquiry:', error);
      //     this.toasterService.showError(
      //       'Failed to submit inquiry. Please try again or call us directly.'
      //     );
      //   },
      //   complete: () => {
      //     this.isSubmitting = false;
      //     this.spinnerService.hide();
      //   },
      // });
    } else {
      this.markFormGroupTouched();
      this.toasterService.showError(
        'Please fill in all required fields correctly.'
      );
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.inquiryForm.controls).forEach((key) => {
      const control = this.inquiryForm.get(key);
      control?.markAsTouched();
    });
  }

  private closeModal() {
    const modalElement = document.getElementById('modernInquiryModal');
    if (modalElement) {
      const modal = (window as any).bootstrap?.Modal?.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.inquiryForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.inquiryForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength'])
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return 'Please enter a valid phone number';
    }
    return '';
  }
}
