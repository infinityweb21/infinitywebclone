import { NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-top-destinations-head',
  imports: [NgStyle],
  templateUrl: './top-destinations-head.component.html',
  styleUrl: './top-destinations-head.component.scss'
})
export class TopDestinationsHeadComponent implements OnInit {
  activeroute: string = '';
  private router: Router = inject(Router);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
 backgroundImageUrl = '';
   private routeBackgrounds: { [key: string]: string } = {
 london: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    madrid: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    paris: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    rome: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    toronto: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    amsterdam: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    maldives: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    bangkok: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    california: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    florida: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    singapore: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    sydney: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    tokyo: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    zurich: 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    // Optional other routes:
    'top-destinations': 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'top-airlines': 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'top-routes': 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'speacial-deals': 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'cruise-lines': 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',
    'default': 'https://theinfinitytravel.com/control/assets/images/top-destinations/1631957667Londonwebp.webp',

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
   this.backgroundImageUrl = this.routeBackgrounds[lastSegment] || this.routeBackgrounds['default'];
  this.cdr.detectChanges();
}

}
