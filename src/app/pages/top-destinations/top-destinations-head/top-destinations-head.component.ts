import { NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-top-destinations-head',
  imports: [NgStyle],
  templateUrl: './top-destinations-head.component.html',
  styleUrl: './top-destinations-head.component.scss',
})
export class TopDestinationsHeadComponent implements OnInit {
  activeroute: string = '';
  private router: Router = inject(Router);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  backgroundImageUrl = '';
  headerText = '';
  subHeaderText = '';
  private routeBackgrounds: { [key: string]: string } = {
    london:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'new-york': 'public/assets/images/destination-banner/new-york.webp',
    madrid:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    paris:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    rome: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    toronto:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    amsterdam:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    maldives:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    bangkok:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    california:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    florida:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    singapore:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    sydney:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    tokyo:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    zurich:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    // Optional other routes:
    'top-destinations':
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'top-airlines':
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'top-routes':
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'speacial-deals':
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'cruise-lines':
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    default:
      'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
  };
  private routeHeaderTexts: { [key: string]: string } = {
    london: 'Discover the Land of Love',
    madrid: 'Discover Madrid',
    paris: 'Experience Paris',
    rome: 'Roam in Rome',
    toronto: 'Toronto Adventures',
    amsterdam: 'Visit Amsterdam',
    maldives: 'Relax in Maldives',
    bangkok: 'Bangkok Awaits',
    california: 'California Vibes',
    florida: 'Fun in Florida',
    singapore: 'Explore Singapore',
    sydney: 'Sydney Escapes',
    tokyo: 'Tokyo Journeys',
    zurich: 'Zurich Charm',
    'top-destinations': 'Top Travel Destinations',
    'top-airlines': 'Best Airlines for Your Trip',
    'top-routes': 'Popular Flight Routes',
    'speacial-deals': 'Special Travel Deals',
    'cruise-lines': 'Explore Cruise Lines',
    default: 'Discover the World',
  };

  private routeSubHeaderTexts: { [key: string]: string } = {
    london:
      'Uncover the best pages of your life by visiting London &amp; make inexplicable memories.',
    madrid: 'Stroll through art, culture, and sunshine.',
    paris: 'The city of lights, love, and fashion.',
    rome: 'Step into ancient history and fine cuisine.',
    toronto: 'A mosaic of cultures and skylines.',
    amsterdam: 'Canals, cafes, and colorful experiences.',
    maldives: 'Turquoise waters and luxury retreats.',
    bangkok: 'A vibrant city of temples and tastes.',
    california: 'Beaches, tech, and endless fun.',
    florida: 'Theme parks, sunshine, and coastlines.',
    singapore: 'A futuristic island city-state.',
    sydney: 'Beaches, harbors, and laid-back life.',
    tokyo: 'Tech, tradition, and Tokyo towers.',
    zurich: 'Alpine beauty and urban elegance.',
    'top-destinations': 'Your guide to trending places worldwide.',
    'top-airlines': 'Fly with the top-rated carriers.',
    'top-routes': 'Navigate the most popular journeys.',
    'speacial-deals': 'Save more on handpicked offers.',
    'cruise-lines': 'Sail away with premier cruise lines.',
    default: 'Plan your next unforgettable journey.',
  };
  ngOnInit(): void {
    this.setActiveTabBasedOnRoute(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveTabBasedOnRoute(event.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit(): void {
    this.setActiveTabBasedOnRoute(this.router.url);
  }

  setActiveTabBasedOnRoute(url: string): void {
    const segments = url.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    console.log('Last segment:', lastSegment);
    this.activeroute = lastSegment;
    this.backgroundImageUrl =
      this.routeBackgrounds[lastSegment] || this.routeBackgrounds['default'];
    this.headerText =
      this.routeHeaderTexts[lastSegment] || this.routeHeaderTexts['default'];
    this.subHeaderText =
      this.routeSubHeaderTexts[lastSegment] ||
      this.routeSubHeaderTexts['default'];

    this.cdr.detectChanges();
  }
}
