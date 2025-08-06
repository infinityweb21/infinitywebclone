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
        title: 'Your One-Stop Travel Platform | Infinityfarecompare',
        data: {
          metaTitle: 'Your One-Stop Travel Platform | Infinityfarecompare',
          metaDescription: 'Book flights, hotels, and cruises in one place. Great deals, 24/7 support, and smooth travel planning with Infinityfarecompare. Click here!'
        }
      },
      {
        path: 'flights',
        loadComponent: () =>
          import('./pages/flight/flight.component').then(
            (m) => m.FlightComponent
          ),
        title: 'Flight Deals & Airline Tickets |Infinityfarecompare',
        data: {
          metaTitle: 'Flight Deals & Airline Tickets |Infinityfarecompare',
          metaDescription: 'Amazing flight deals with our expert booking service. Get competitive prices and access to top airlines worldwide. Start your journey today!'
        }
      },
      {
        path: 'flights/international-flights-from-us',
        loadComponent: () =>
          import('./pages/flight/international/international.component').then(
            (m) => m.InternationalComponent
          ),
        title: 'Flights from US at Great Prices | Infinityfarecompare',
        data: {
          metaTitle: 'Flights from US at Great Prices | Infinityfarecompare',
          metaDescription: 'Book international flights from the US and unlock global adventures. Enjoy low fares, fast booking, and round-the-clock travel support.'
        }
      },
      {
        path: 'flights/first-class',
        loadComponent: () =>
          import('./pages/flight/first-class/first-class.component').then(
            (m) => m.FirstClassComponent
          ),
        title: 'Fly First Class in Comfort | Deals at Infinityfarecompare',
        data: {
          metaTitle: 'Fly First Class in Comfort | Deals at Infinityfarecompare',
          metaDescription: 'Infinityfarecompare makes First Class booking simple. Search flights, compare amenities, and fly in comfort. Your premium seat is just a few clicks away.'
        }
      },
      {
        path: 'flights/business-class',
        loadComponent: () =>
          import('./pages/flight/business-class/business-class.component').then(
            (m) => m.BusinessClassComponent
          ),
        title: 'Discounted Business Class Flights | Infinityfarecompare',
        data: {
          metaTitle: 'Discounted Business Class Flights | Infinityfarecompare',
          metaDescription: 'Infinityfarecompare makes premium travel more accessible. Get discounted business class fares on international routes—call us today!'
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
        title: 'Get Amazing Hotel Deals at the Best Rates | Infinityfarecompare',
         data: {
          metaTitle: 'Get Amazing Hotel Deals at the Best Rates  | Infinityfarecompare',
          metaDescription: 'Enjoy luxurious comfort and exceptional service at this hotel, featuring modern amenities and a prime location for a memorable stay.'
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
        title: 'Plan Your Perfect Cruise Escape | Infinityfarecompare',
        data: {
          metaTitle: 'Plan Your Perfect Cruise Escape | Infinityfarecompare',
          metaDescription: 'Discover popular cruise routes, trending destinations and great deals. Plan your next sea adventure with Infinityfarecompare for exclusive cruise experiences now'
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
        title: 'Your Travel Booking Partner  | Infinityfarecompare',
        data: {
          metaTitle: 'Your Travel Booking Partner  | Infinityfarecompare',
          metaDescription: 'Trusted by thousands of travelers. We offer professional booking services for flights, hotels & cruises with dedicated customer support. Contact today'
        }
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./pages/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          ),
        title: 'Get in Touch with Us | Infinityfarecompare',
        data: {
          metaTitle: 'Get in Touch with Us | Infinityfarecompare',
          metaDescription: 'Have questions or need assistance? Call us today through our contact page for prompt support and helpful information. Infinityfarecompare'
        }
      },
      {
        path: 'cookie-policy',
        loadComponent: () =>
          import('./pages/cookie-policy/cookie-policy.component').then(
            (m) => m.CookiePolicyComponent
          ),
        title: 'Learn How Cookies Help Us Improve Your Visit | Infinityfarecompare',
        data: {
          metaTitle: 'Learn How Cookies Help Us Improve Your Visit | Infinityfarecompare',
          metaDescription: 'Cookies help us remember you, show better deals, and boost performance. See how Infinityfarecompare uses cookies and how you can take control.'
        }
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./pages/privacy-policy/privacy-policy.component').then(
            (m) => m.PrivacyPolicyComponent
          ),
        title: 'Privacy Policy | Infinityfarecompare',
        data: {
          metaTitle: 'Privacy Policy | Infinityfarecompare',
          metaDescription: 'Learn how Infinityfarecompare collects, protects, and uses your data. Read our Privacy Policy to ensure a safe and secure travel experience.'
        }
      },
      {
        path: 'disclaimer',
        loadComponent: () =>
          import('./pages/disclaimer/disclaimer.component').then(
            (m) => m.DisclaimerComponent
          ),
        title: 'Stay Informed, Travel Smart | Infinityfarecompare',
        data: {
          metaTitle: 'Stay Informed, Travel Smart | Infinityfarecompare',
          metaDescription: 'Get the lowdown on Infinityfarecompare’s disclaimer. We keep things genuine, with no fluff and only transparency. Read our simple terms before you explore.'
        }
      },
      {
        path: 'testimonials',
        loadComponent: () =>
          import('./pages/testimonials/testimonials.component').then(
            (m) => m.TestimonialsComponent
          ),
        title: 'Review our Testimonials | Infinityfarecompare',
        data: {
          metaTitle: 'Review our Testimonials | Infinityfarecompare',
          metaDescription: ' Wondering why you should be trusting us? Check what our Loyal Customers have to say about us - Call us for more valuable insights'
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
        title: 'Know About our Booking Service Fees | Infinityfarecompare',
        data: {
          metaTitle: 'Know About our Booking Service Fees | Infinityfarecompare',
          metaDescription: 'Know your costs before you go. Our clear service fees cover everything from flights to cruises, so you can book with confidence. '
        }
      },
      {
        path: 'post-ticketing-fees',
        loadComponent: () =>
          import(
            './pages/post-ticketing-fees/post-ticketing-fees.component'
          ).then((m) => m.PostTicketingFeesComponent),
        title: 'Know Your Flight Post-Ticketing Charges | Infinityfarecompare',
        data: {
          metaTitle: 'Know Your Flight Post-Ticketing Charges | Infinityfarecompare',
          metaDescription: 'Stay informed with a full breakdown of post-ticketing fees - refunds, rebooking, agent waivers, and more. Plan smart, travel smarter every time.'
        }
      },
      {
        path: 'top-airlines-deals',
        loadComponent: () =>
          import(
            './pages/flight/top-airlines-deals/top-airlines-deals.component'
          ).then((m) => m.TopAirlinesDealsComponent),
        title: 'Best Flight Discounts 2025 | Infinityfarecompare',
        data: {
          metaTitle: 'Best Flight Discounts 2025 | Infinityfarecompare',
          metaDescription: 'Check out the best airline deals for 2025. Compare top airlines, save on domestic and international travel, and book the tickets. Click here!'
        }
      },
      {
        path:'cancellation-policy',
        loadComponent: () =>
          import('./pages/cancellation-policy/cancellation-policy.component').then(
            (m) => m.CancellationPolicyComponent
          ),
        title: 'Flexible Flight Cancellation Guidelines | Infinityfarecompare',
        data: {
          metaTitle: 'Flexible Flight Cancellation Guidelines | Infinityfarecompare',
          metaDescription: 'Understand how to cancel or modify your travel bookings with Infinityfarecompare. Transparent terms, simple process, clear communication'
        }
      },{
        path: 'terms-and-conditions',
        loadComponent: () =>
          import('./pages/terms-and-conditions/terms-and-conditions.component').then(
            (m) => m.TermsAndConditionsComponent
          ),
        title: 'Terms & Conditions  | Infinityfarecompare',
        data: {
          metaTitle: 'Terms & Conditions  | Infinityfarecompare',
          metaDescription: 'Stay informed with our Terms & Conditions. Learn about our policies, user responsibilities, and booking guidelines to ensure a smooth booking experience.'
        }
      },{
        path:'cancellation-policy',
        loadComponent:()=>
          import('./pages/cancellation-policy/cancellation-policy.component').then(
            (m) => m.CancellationPolicyComponent
          ),
          title: 'Flexible Flight Cancellation Guidelines | Infinityfarecompare',
          data: { 
            metaTitle: 'Flexible Flight Cancellation Guidelines | Infinityfarecompare',
            metaDescription: 'Understand your rights and responsibilities when using our site. We keep it fair, clear, and straightforward for all users. A better experience starts here'
          } 
      },{
        path: 'top-routes',
        loadComponent: () =>
          import('./pages/top-routes/top-routes.component').then(
            (m) => m.TopRoutesComponent
          ),
      },
     {
  path: 'top-destinations/london',
  loadComponent: () =>
    import('./pages/top-destinations/london/london.component').then(
      (m) => m.LondonComponent
    ),
},
 {
  path: 'top-destinations/madrid',
  loadComponent: () =>
    import('./pages/top-destinations/madrid/madrid.component').then(
      (m) => m.MadridComponent
    ),
},
{
  path: 'top-destinations/new-york',
  loadComponent: () =>
    import('./pages/top-destinations/new-york/new-york.component').then(
      (m) => m.NewYorkComponent
    ),
},
{
  path: 'top-destinations/paris',
  loadComponent: () =>
    import('./pages/top-destinations/paris/paris.component').then(
      (m) => m.ParisComponent
    ),
},
{
  path: 'top-destinations/rome',
  loadComponent: () =>
    import('./pages/top-destinations/rome/rome.component').then(
      (m) => m.RomeComponent
    ),
},
{
  path: 'top-destinations/toronto',
  loadComponent: () =>
    import('./pages/top-destinations/toronto/toronto.component').then(
      (m) => m.TorontoComponent
    ),
},
{
  path: 'top-destinations/amsterdam',
  loadComponent: () =>
    import('./pages/top-destinations/amsterdam/amsterdam.component').then(
      (m) => m.AmsterdamComponent
    ),
},
{
  path: 'top-destinations/maldives',
  loadComponent: () =>
    import('./pages/top-destinations/maldives/maldives.component').then(
      (m) => m.MaldivesComponent
    ),
},
{
  path: 'top-destinations/bangkok',
  loadComponent: () =>
    import('./pages/top-destinations/bangkok/bangkok.component').then(
      (m) => m.BangkokComponent
    ),
},
{
  path: 'top-destinations/california',
  loadComponent: () =>
    import('./pages/top-destinations/california/california.component').then(
      (m) => m.CaliforniaComponent
    ),
},

{
  path: 'top-destinations/florida',
  loadComponent: () =>
    import('./pages/top-destinations/florida/florida.component').then(
      (m) => m.FloridaComponent
    ),
},
{
  path: 'top-destinations/san-francisco',
  loadComponent: () =>
    import('./pages/top-destinations/san-francisco/san-francisco.component').then(
      (m) => m.SanFranciscoComponent
    ),
},
{
  path: 'top-destinations/singapore',
  loadComponent: () =>
    import('./pages/top-destinations/singapore/singapore.component').then(
      (m) => m.SingaporeComponent
    ),
},
{
  path: 'top-destinations/swis-alps',
  loadComponent: () =>
    import('./pages/top-destinations/swis-alps/swis-alps.component').then(
      (m) => m.SwisAlpsComponent
    ),
},
{
  path: 'top-destinations/kuala-lumpur',
  loadComponent: () =>
    import('./pages/top-destinations/kuala-lumpur/kuala-lumpur.component').then(
      (m) => m.KualaLumpurComponent
    ),
},
{
  path: 'top-destinations/sydney',
  loadComponent: () =>
    import('./pages/top-destinations/sydney/sydney.component').then(
      (m) => m.SydneyComponent
    ),
},
     {
  path: 'top-destinations/tokyo',
  loadComponent: () =>
    import('./pages/top-destinations/tokyo/tokyo.component').then(
      (m) => m.TokyoComponent
    ),
}, 
{
  path: 'top-destinations/zurich',
  loadComponent: () =>
    import('./pages/top-destinations/zurich/zurich.component').then(
      (m) => m.ZurichComponent
    ),
},
{
  path: 'top-destinations',
  loadComponent: () =>
    import('./pages/top-destinations/top-destination/top-destination.component').then(
      (m) => m.TopDestinationComponent
    ),
},
{
  path: 'top-airlines',
  loadComponent: () =>
    import('./pages/top-destinations/top-airlines/top-airlines.component').then(
      (m) => m.TopAirlinesComponent
    ),
},
{
  path: 'top-route',
  loadComponent: () =>
    import('./pages/top-destinations/top-routes/top-routes.component').then(
      (m) => m.TopRoutesComponent
    ),
},
{
  path: 'speacial-deals',
  loadComponent: () =>
    import('./pages/top-destinations/special-deals/special-deals.component').then(
      (m) => m.SpecialDealsComponent
    ),
},
{
  path: 'cruise-lines',
  loadComponent: () =>
    import('./pages/top-destinations/cruise-lines/cruise-lines.component').then(
      (m) => m.CruiseLinesComponent
    ),
},
{
  path: 'thankyou',
  loadComponent: () =>
    import('./components/thankyou/thankyou.component').then(
      (m) => m.ThankyouComponent
    ),
},
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
