import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-top-destinations-head',
  imports: [],
  templateUrl: './top-destinations-head.component.html',
  styleUrl: './top-destinations-head.component.scss'
})
export class TopDestinationsHeadComponent implements OnInit {
  activeroute: string = '';
  private router: Router = inject(Router);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

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
  this.cdr.detectChanges();
}

}
