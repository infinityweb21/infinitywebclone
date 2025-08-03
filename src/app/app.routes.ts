import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Your One-Stop Travel Platform | Infinity Travel',
        data: {
          metaTitle: 'Your One-Stop Travel Platform | Infinity Travel',
          metaDescription: 'Book flights, hotels, and cruises in one place. Great deals, 24/7 support, and smooth travel planning withInfinity Travel. Click here!'
        }
      },
      {
        path: 'flights',
        loadComponent: () =>
          import('./pages/flight/flight.component').then(
            (m) => m.FlightComponent
          ),
        title: 'Find Great Flight Deals Fast |Infinity Travel',
        data: {
          metaTitle: 'Find Great Flight Deals Fast |Infinity Travel',
          metaDescription: 'Explore top-flight destinations worldwide with easy booking and great deals at Infinity Travel. Start your journey with us today!'
        }
      },
      {
        path: 'flights/international-flights-from-us',
        loadComponent: () =>
          import('./pages/flight/international/international.component').then(
            (m) => m.InternationalComponent
          ),
        title: 'Flights from US at Great Prices | Infinity Travel',
        data: {
          metaTitle: 'Flights from US at Great Prices | Infinity Travel',
          metaDescription: 'Book international flights from the US and unlock global adventures. Enjoy low fares, fast booking, and round-the-clock travel support.'
        }
      },
      {
        path: 'flights/first-class',
        loadComponent: () =>
          import('./pages/flight/first-class/first-class.component').then(
            (m) => m.FirstClassComponent
          ),
        title: 'Fly First Class in Comfort | Deals at Infinity Travel',
        data: {
          metaTitle: 'Fly First Class in Comfort | Deals at Infinity Travel',
          metaDescription: 'Infinity Travel makes First Class booking simple. Search flights, compare amenities, and fly in comfort. Your premium seat is just a few clicks away.'
        }
      },
      {
        path: 'flights/business-class',
        loadComponent: () =>
          import('./pages/flight/business-class/business-class.component').then(
            (m) => m.BusinessClassComponent
          ),
        title: 'Discounted Business Class Flights | Infinity Travel',
        data: {
          metaTitle: 'Discounted Business Class Flights | Infinity Travel',
          metaDescription: 'Infinity Travel makes premium travel more accessible. Get discounted business class fares on international routes—call us today!'
        }
      },
      {
        path: 'flights-list',
        loadComponent: () =>
          import('./pages/flights-list/flights-list.component').then(
            (m) => m.FlightsListComponent
          ),
        title: 'Flights List',
      },
      {
        path: 'flight-details',
        loadComponent: () =>
          import(
            './pages/flights-list/flight-details/flight-details.component'
          ).then((m) => m.FlightDetailsComponent),
        title: 'Flight Details',
      },
      {
        path: 'select-seats',
        loadComponent: () =>
          import(
            './pages/flights-list/flight-details/select-seats/select-seats.component'
          ).then((m) => m.SelectSeatsComponent),
      },
      {
        path: 'payment',
        loadComponent: () =>
          import(
            './pages/flights-list/flight-details/select-seats/flight-booking-payment/flight-booking-payment.component'
          ).then((m) => m.FlightBookingPaymentComponent),
      },
      {
        path: 'flight-booking-confirmation',
        loadComponent: () =>
          import(
            './pages/flights-list/flight-details/select-seats/flight-booking-payment/confirm-ticket/confirm-ticket.component'
          ).then((m) => m.ConfirmTicketComponent),
      },
      {
        path: 'hotel',
        loadComponent: () =>
          import('./pages/hotel/hotel.component').then((m) => m.HotelComponent),
        title: 'Secure your stay at the best prices | Infinity Travel',
         data: {
          metaTitle: 'Secure your stay at the best prices  | Infinity Travel',
          metaDescription: 'Explore and book various hotels from affordable to luxurious in top destinations worldwide. Book now!'
        }
      },
      {
        path: 'hotels-list',
        loadComponent: () =>
          import('./pages/hotels-list/hotels-list.component').then(
            (m) => m.HotelsListComponent
          ),
        title: 'Hotels List',
      },
      {
        path: 'hotel-details',
        loadComponent: () =>
          import(
            './pages/hotels-list/hotel-details/hotel-details.component'
          ).then((m) => m.HotelDetailsComponent),
        title: 'Hotel Details',
      },
      {
        path: 'hotel-booking',
        loadComponent: () =>
          import(
            './pages/hotels-list/hotel-details/hotel-booking-payment/hotel-booking-payment.component'
          ).then((m) => m.HotelBookingPaymentComponent),
        title: 'Hotel Booking',
      },
      {
        path: 'hotel-booking-ticket/:bookingId',
        loadComponent: () =>
          import(
            './pages/hotels-list/hotel-details/hotel-booking-ticket/hotel-booking-ticket.component'
          ).then((m) => m.HotelBookingTicketComponent),
        title: 'Hotel Booking Ticket',
      },
      {
        path: 'cruise',
        loadComponent: () =>
          import('./pages/cruise/cruise.component').then(
            (m) => m.CruiseComponent
          ),
        title: 'Plan Your Perfect Cruise Escape | Infinity Travel',
        data: {
          metaTitle: 'Plan Your Perfect Cruise Escape | Infinity Travel',
          metaDescription: 'Discover popular cruise routes, trending destinations and great deals. Plan your next sea adventure with Infinity Travel for exclusive cruise experiences now'
        }
      },
      {
        path: 'cruises-list',
        loadComponent: () =>
          import('./pages/cruises-list/cruises-list.component').then(
            (m) => m.CruisesListComponent
          ),
        title: 'Cruises List',
      },
      {
        path: 'cruise-details',
        loadComponent: () =>
          import(
            './pages/cruises-list/cruise-details/cruise-details.component'
          ).then((m) => m.CruiseDetailsComponent),
        title: 'Cruise Details',
      },
      {
        path: 'cruise-booking',
        loadComponent: () =>
          import(
            './pages/cruises-list/cruise-details/cruise-booking-payment/cruise-booking-payment.component'
          ).then((m) => m.CruiseBookingPaymentComponent),
        title: 'Cruise Booking',
      },
      {
        path: 'about-us',
        loadComponent: () =>
          import('./pages/about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
        title: 'Trusted Experts in Global Travel | Infinity Travel',
        data: {
          metaTitle: 'Trusted Experts in Global Travel | Infinity Travel',
          metaDescription: 'Discover how Infinity Travel puts your travel dreams at the heart of every plan with curated trips, expert guidance, and exceptional service from start to finish'
        }
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./pages/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          ),
        title: 'Get in Touch with Us | Infinity Travel',
        data: {
          metaTitle: 'Get in Touch with Us | Infinity Travel',
          metaDescription: 'Have questions or need assistance? Call us today through our contact page for prompt support and helpful information. Infinity Travel'
        }
      },
      {
        path: 'cookie-policy',
        loadComponent: () =>
          import('./pages/cookie-policy/cookie-policy.component').then(
            (m) => m.CookiePolicyComponent
          ),
        title: 'Learn How Cookies Help Us Improve Your Visit | Infinity Travel',
        data: {
          metaTitle: 'Learn How Cookies Help Us Improve Your Visit | Infinity Travel',
          metaDescription: 'Cookies help us remember you, show better deals, and boost performance. See how Infinity Travel uses cookies and how you can take control.'
        }
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./pages/privacy-policy/privacy-policy.component').then(
            (m) => m.PrivacyPolicyComponent
          ),
        title: 'Read Our Detailed Privacy Policy & Commitments | Infinity Travel',
        data: {
          metaTitle: 'Read Our Detailed Privacy Policy & Commitments | Infinity Travel',
          metaDescription: 'Your travel privacy matters. Read how Infinity Travel keeps your data secure across all bookings, flights, hotels and cruises.'
        }
      },
      {
        path: 'disclaimer',
        loadComponent: () =>
          import('./pages/disclaimer/disclaimer.component').then(
            (m) => m.DisclaimerComponent
          ),
        title: 'Our Travel Disclaimer Guide | Infinity Travel',
        data: {
          metaTitle: 'Our Travel Disclaimer Guide | Infinity Travel',
          metaDescription: 'We\'re upfront about how we share info and what you should know. Read our disclaimer to understand how we guide your travel journey with care.'
        }
      },
      {
        path: 'testimonials',
        loadComponent: () =>
          import('./pages/testimonials/testimonials.component').then(
            (m) => m.TestimonialsComponent
          ),
        title: 'Honest Traveler Stories | Infinity Travel',
        data: {
          metaTitle: 'Honest Traveler Stories | Infinity Travel',
          metaDescription: 'Hear what travelers say about their flight, hotel and cruise bookings. Honest reviews from people who planned smooth and happy getaways.'
        }
      },
      {
        path: 'support',
        loadComponent: () =>
          import('./pages/support/support.component').then(
            (m) => m.SupportComponent
          ),
      },
      {
        path: 'careers',
        loadComponent: () =>
          import('./pages/careers/careers.component').then(
            (m) => m.CareersComponent
          ),
      },
      {
        path: 'careers/job-details/:id',
        loadComponent: () =>
          import('./pages/careers/job-details/job-details.component').then(
            (m) => m.JobDetailsComponent
          ),
      },
      {
        path: 'our-service-fees',
        loadComponent: () =>
          import('./pages/our-service-fees/our-service-fees.component').then(
            (m) => m.OurServiceFeesComponent
          ),
        title: 'Understand Our Travel Service Fees | Infinity Travel',
        data: {
          metaTitle: 'Understand Our Travel Service Fees | Infinity Travel',
          metaDescription: 'View booking fee details for all services - flights, hotels, car hires, and cruises. Plan smarter by knowing exactly how much you\'re being charged.'
        }
      },
      {
        path: 'post-ticketing-fees',
        loadComponent: () =>
          import(
            './pages/post-ticketing-fees/post-ticketing-fees.component'
          ).then((m) => m.PostTicketingFeesComponent),
        title: 'Know Your Flight Post-Ticketing Charges | Infinity Travel',
        data: {
          metaTitle: 'Know Your Flight Post-Ticketing Charges | Infinity Travel',
          metaDescription: 'Stay informed with a full breakdown of post-ticketing fees - refunds, rebooking, agent waivers, and more. Plan smart, travel smarter every time.'
        }
      },
      {
        path: 'top-airlines-deals',
        loadComponent: () =>
          import(
            './pages/flight/top-airlines-deals/top-airlines-deals.component'
          ).then((m) => m.TopAirlinesDealsComponent),
        title: 'Best Flight Discounts 2025 | Infinity Travel',
        data: {
          metaTitle: 'Best Flight Discounts 2025 | Infinity Travel',
          metaDescription: 'Check out the best airline deals for 2025. Compare top airlines, save on domestic and international travel, and book the tickets. Click here!'
        }
      },
      {
        path:'cancellation-policy',
        loadComponent: () =>
          import('./pages/cancellation-policy/cancellation-policy.component').then(
            (m) => m.CancellationPolicyComponent
          ),
        title: 'Flexible Flight Cancellation Guidelines | Infinity Travel',
        data: {
          metaTitle: 'Flexible Flight Cancellation Guidelines | Infinity Travel',
          metaDescription: 'Understand how to cancel or modify your travel bookings with Infinity Travel. Transparent terms, simple process, clear communication'
        }
      },{
        path: 'terms-and-conditions',
        loadComponent: () =>
          import('./pages/terms-and-conditions/terms-and-conditions.component').then(
            (m) => m.TermsAndConditionsComponent
          ),
        title: 'Read Our Terms & Conditions For Smart Browsing | Infinity Travel',
        data: {
          metaTitle: 'Read Our Terms & Conditions For Smart Browsing | Infinity Travel',
          metaDescription: 'Understand your rights and responsibilities when using our site. We keep it fair, clear, and straightforward for all users. A better experience starts here.'
        }
      },{
        path:'cancellation-policy',
        loadComponent:()=>
          import('./pages/cancellation-policy/cancellation-policy.component').then(
            (m) => m.CancellationPolicyComponent
          ),
          title: 'Flexible Flight Cancellation Guidelines | Infinity Travel',
          data: { 
            metaTitle: 'Flexible Flight Cancellation Guidelines | Infinity Travel',
            metaDescription: 'Understand your rights and responsibilities when using our site. We keep it fair, clear, and straightforward for all users. A better experience starts here'
          } 
      },{
        path: 'top-routes',
        loadComponent: () =>
          import('./pages/top-routes/top-routes.component').then(
            (m) => m.TopRoutesComponent
          ),
      }
    ],
  },

  // Auth and NotFound routes under BlankLayout
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'auth/login',
        loadComponent: () =>
          import('./pages/authentication/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'auth/register',
        loadComponent: () =>
          import('./pages/authentication/signup/signup.component').then(
            (m) => m.SignupComponent
          ),
        title: 'Register',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
        title: 'Not Found',
      },
    ],
  },
];
