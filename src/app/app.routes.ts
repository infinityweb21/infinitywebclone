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
        title: 'Book Cheap Flights & Hotels Online– Infinity Farecompare',
        data: {
          metaTitle: 'Book Cheap Flights & Hotels Online– Infinity Farecompare',
          metaDescription:
            ' Find and book cheap flights & hotels with Infinity Farecompare. Compare top deals, exclusive discounts, and save big on your next trip.',
        },
      },
      {
        path: 'flights',
        loadComponent: () =>
          import('./pages/flight/flight.component').then(
            (m) => m.FlightComponent
          ),
        title: 'Cheap Flights & Tickets – Best Airline Deals Online',
        data: {
          metaTitle: 'Cheap Flights & Tickets – Best Airline Deals Online',
          metaDescription:
            'Discover cheap flights, plane tickets, and top airline deals online. Compare fares, grab offers, and save more on every booking.',
        },
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
          metaDescription:
            'Book international flights from the US and unlock global adventures. Enjoy low fares, fast booking, and round-the-clock travel support.',
        },
      },
      {
        path: 'flights/first-class',
        loadComponent: () =>
          import('./pages/flight/first-class/first-class.component').then(
            (m) => m.FirstClassComponent
          ),
        title: 'Fly First Class in Comfort | Deals at Infinityfarecompare',
        data: {
          metaTitle:
            'Fly First Class in Comfort | Deals at Infinityfarecompare',
          metaDescription:
            'Infinityfarecompare makes First Class booking simple. Search flights, compare amenities, and fly in comfort. Your premium seat is just a few clicks away.',
        },
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
          metaDescription:
            'Infinityfarecompare makes premium travel more accessible. Get discounted business class fares on international routes—call us today!',
        },
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
        path: 'flight/select-seats',
        loadComponent: () =>
          import(
            './pages/flights-list/flight-details/select-seats/select-seats.component'
          ).then((m) => m.SelectSeatsComponent),
      },
      {
        path: 'flight/payment',
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
        title: 'Cheap Hotel Reservations – Best Deals & Discounts',
        data: {
          metaTitle: 'Cheap Hotel Reservations – Best Deals & Discounts',
          metaDescription:
            'Book cheap hotel reservations with Infinity Farecompare. Find the best deals, offers, and discounts to save on your next stay.',
        },
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
          metaDescription:
            'Discover popular cruise routes, trending destinations and great deals. Plan your next sea adventure with Infinityfarecompare for exclusive cruise experiences now',
        },
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
        title: ' About Infinity Farecompare',
        data: {
          metaTitle: ' About Infinity Farecompare',
          metaDescription:
            'Learn more about Infinity Farecompare and our mission to make travel affordable for everyone. Explore our story, values, and dedication to delivering top deals.',
        },
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./pages/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          ),
        title: 'Contact Us – Get in Touch with Infinity Farecompare',
        data: {
          metaTitle: 'Contact Us – Get in Touch with Infinity Farecompare',
          metaDescription:
            'Need travel assistance? Contact Infinity Farecompare for 24/7 support on flights, hotels, and tour bookings. We’re always here to make your trip smooth and affordable.',
        },
      },
      {
        path: 'cookie-policy',
        loadComponent: () =>
          import('./pages/cookie-policy/cookie-policy.component').then(
            (m) => m.CookiePolicyComponent
          ),
        title: 'Our Cookie Policy | Infinityfarecompare',
        data: {
          metaTitle: 'Our Cookie Policy | Infinityfarecompare',
          metaDescription:
            'We collect cookies to make your browsing experience smoother, faster, and more personalized. Learn how we use them.',
        },
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./pages/privacy-policy/privacy-policy.component').then(
            (m) => m.PrivacyPolicyComponent
          ),
        title: 'Privacy Policy – Infinity Farecompare',
        data: {
          metaTitle: 'Privacy Policy – Infinity Farecompare',
          metaDescription:
            'Read Infinity Farecompare’s Privacy Policy to learn how we collect, use, and protect your personal information while providing you with the best travel deals.',
        },
      },
      {
        path: 'disclaimer',
        loadComponent: () =>
          import('./pages/disclaimer/disclaimer.component').then(
            (m) => m.DisclaimerComponent
          ),
        title:
          'Infinity Farecompare Disclaimer – Transparency & Liability Terms',
        data: {
          metaTitle:
            'Infinity Farecompare Disclaimer – Transparency & Liability Terms',
          metaDescription:
            'Our Disclaimer outlines the scope and limitations of travel content, prices, and offers listed on Infinity Farecompare.',
        },
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
          metaDescription:
            ' Wondering why you should be trusting us? Check what our Loyal Customers have to say about us - Call us for more valuable insights',
        },
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
          metaTitle:
            'Know About our Booking Service Fees | Infinityfarecompare',
          metaDescription:
            'Know your costs before you go. Our clear service fees cover everything from flights to cruises, so you can book with confidence. ',
        },
      },
      {
        path: 'post-ticketing-fees',
        loadComponent: () =>
          import(
            './pages/post-ticketing-fees/post-ticketing-fees.component'
          ).then((m) => m.PostTicketingFeesComponent),
        title: 'Booking Fee Details Made Clear | Infinityfarecompare',
        data: {
          metaTitle: 'Booking Fee Details Made Clear | Infinityfarecompare',
          metaDescription:
            'Learn about our service charges for flights, cruises, and more. Stay informed before booking and travel smarter with complete pricing transparency.',
        },
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
          metaDescription:
            'Check out the best airline deals for 2025. Compare top airlines, save on domestic and international travel, and book the tickets. Click here!',
        },
      },
      {
        path: 'cancellation-policy',
        loadComponent: () =>
          import(
            './pages/cancellation-policy/cancellation-policy.component'
          ).then((m) => m.CancellationPolicyComponent),
        title: 'Cancellation Policy | Infinityfarecompare',
        data: {
          metaTitle: 'Cancellation Policy | Infinityfarecompare',
          metaDescription:
            'Learn how to cancel your flight, hotel, or cruise bookings with ease. Review refund terms and timelines at Infinityfarecompare',
        },
      },
      {
        path: 'terms-and-conditions',
        loadComponent: () =>
          import(
            './pages/terms-and-conditions/terms-and-conditions.component'
          ).then((m) => m.TermsAndConditionsComponent),
        title: 'Terms and Conditions – Infinity Farecompare',
        data: {
          metaTitle: 'Terms and Conditions – Infinity Farecompare',
          metaDescription:
            'Infinity Farecompare’s Terms and Conditions ensure every booking is safe, transparent, and backed by our trusted travel service.',
        },
      },
      {
        path: 'cancellation-policy',
        loadComponent: () =>
          import(
            './pages/cancellation-policy/cancellation-policy.component'
          ).then((m) => m.CancellationPolicyComponent),
        title: 'Flexible Flight Cancellation Guidelines | Infinityfarecompare',
        data: {
          metaTitle:
            'Flexible Flight Cancellation Guidelines | Infinityfarecompare',
          metaDescription:
            'Understand your rights and responsibilities when using our site. We keep it fair, clear, and straightforward for all users. A better experience starts here',
        },
      },
      {
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
          import(
            './pages/top-destinations/california/california.component'
          ).then((m) => m.CaliforniaComponent),
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
    title: 'Affordable Airlines Deals | Infinityfarecompare',
          data: { 
            metaTitle: 'Affordable Airlines Deals | Infinityfarecompare',
            metaDescription: 'Don’t miss out on limited-time airline offers. Compare top carriers and lock in your flight today. Simple, fast, and secure booking.'
          }
},
{
  path: 'top-route',
  loadComponent: () =>
    import('./pages/top-destinations/top-routes/top-routes.component').then(
      (m) => m.TopRoutesComponent
    ),
    title: 'Our Leading Flight Routes | Infinityfarecompare',
          data: { 
            metaTitle: 'Our Leading Flight Routes | Infinityfarecompare',
            metaDescription: 'See and explore our choices! Learn more about the top flight routes reserved by passengers around the world through our platform. Click here now!'
          }
},
{
  path: 'speacial-deals',
  loadComponent: () =>
    import('./pages/top-destinations/special-deals/special-deals.component').then(
      (m) => m.SpecialDealsComponent
    ),
    title: 'Special Deals for Your Travel | Infinityfarecompare',
          data: { 
            metaTitle: 'Special Deals for Your Travel | Infinityfarecompare',
            metaDescription: 'Infinityfarecompare offers special deals on hotels, flights, and cruise bookings to fulfil your travel dreams. Call us today!'
          }
},
{
  path: 'cruise-lines',
  loadComponent: () =>
    import('./pages/top-destinations/cruise-lines/cruise-lines.component').then(
      (m) => m.CruiseLinesComponent
    ),
    title: 'Your Guide to Cruise Booking Deals | Infinityfarecompare',
          data: { 
            metaTitle: 'Your Guide to Cruise Booking Deals | Infinityfarecompare',
            metaDescription: 'Plan your perfect escape with ease and explore beautiful destinations with onboard activities and exclusive offers. Click here!'
          }
},
{
  path: 'thankyou',
  loadComponent: () =>
    import('./components/thankyou/thankyou.component').then(
      (m) => m.ThankyouComponent
    ),
},
{
  path: 'thank-you',
  loadComponent: () =>
    import('./components/leadthankyou/leadthankyou.component').then(
      (m) => m.LeadthankyouComponent
    ),
},
{
  path: 'private-jet',
  loadComponent: () =>
    import('./pages/private-jet/private-jet.component').then(
      (m) => m.PrivateJetComponent
    ),
    title: ' Choose our Private Jet Services | Infinityfarecompare',
          data: { 
            metaTitle: ' Choose our Private Jet Services | Infinityfarecompare',
            metaDescription: ' Experience the finest offerings of Private Jets with infinityfarecompare.us ! Travel on your terms with flexible bookings, luxurious experiences & privacy!'
          }
},
{
        path: 'car',
        loadComponent: () =>
          import('./pages/car/car.component').then((m) => m.CarComponent),
        title: 'Get the Best Deals on Car Rentals | Infinityfarecompare',
        data: {
          metaTitle: 'Get the Best Deals on Car Rentals | Infinityfarecompare',
          metaDescription:
            'Infinityfarecompare offers private car rentals for every type of traveler at the most reasonable prices. Call us to book your vehicles.',
        },
      },

            {
        path: 'flights-au',
        loadComponent: () =>
          import('./pages/australia/flight/flight.component').then(
            (m) => m.FlightComponent
          ),
        title: 'Book flights at the best deals | Infinityfarecompare',
        data: {
          metaTitle: 'Book flights at the best deals | Infinityfarecompare',
          metaDescription:
            'Discover your dream destinations with the best flight deals. Plan your journey with reliable travel support and secure booking process.',
        },
      },
      {
        path: 'terms-and-conditions-au',
        loadComponent: () =>
          import('./pages/australia/terms-condition/terms-condition.component').then(
            (m) => m.TermsConditionComponent
          ),
        title: 'Review our Terms and Conditions | Infinityfarecompare',
        data: {
          metaTitle: 'Review our Terms and Conditions | Infinityfarecompare',
          metaDescription:
            'Please read the Terms and Conditions carefelly before proceeding to book your flights with us. Call us for more additional information, as we are available round the clock',
        },
      },
      {
        path: 'privacy-policy-au',
        loadComponent: () =>
          import('./pages/australia/privacy-policy/privacy-policy.component').then(
            (m) => m.PrivacyPolicyComponent
          ),
        title: 'Our Privacy Promise to Travelers | Infinityfarecompare',
        data: {
          metaTitle: 'Our Privacy Promise to Travelers | Infinityfarecompare',
          metaDescription:
            'Your privacy matters. Discover how we safeguard your information for flights. We’re clear about what we gather and how we keep it secure throughout your travels',
        },
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
