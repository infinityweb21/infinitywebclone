import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CruisesTabComponent } from './cruises-tab/cruises-tab.component';
import { FlightsTabComponent } from './flights-tab/flights-tab.component';
import { HotelsTabComponent } from './hotels-tab/hotels-tab.component';
import { PackagesTabComponent } from './packages-tab/packages-tab.component';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SvgIcons } from '../../shared/svg-icons';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-main-filter',
  imports: [
    CruisesTabComponent,
    FlightsTabComponent,
    HotelsTabComponent,
    PackagesTabComponent,
    CommonModule,
  ],
  templateUrl: './main-filter.component.html',
  styleUrl: './main-filter.component.scss',
})
export class MainFilterComponent implements OnInit {
  activeTab: string = '';
  activeTabCta: string = 'flights-tab';
  private router: Router = inject(Router);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected icons = inject(SvgIcons);

  // Company Name Get
  private shareService: SharedService = inject(SharedService);
  companyName: string = '';
  phoneNumber: string = '';

  showHome: boolean = false;
  showHomeCta: boolean = false;

  toggleTab(tab: string): void {
    this.activeTab = tab;
    console.log('this.activeTab', this.activeTab);
  }

  ngOnInit(): void {
    // Company Name Get
    const data = this.shareService.getcompanyName();
    this.companyName = data.companyName;
    this.phoneNumber = data.phoneNumber;

    // Set the tab immediately on init
    this.setActiveTabBasedOnRoute(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveTabBasedOnRoute(event.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit(): void {
    // Optional: can re-check tab here if timing matters
    this.setActiveTabBasedOnRoute(this.router.url);
  }

  setActiveTabBasedOnRoute(url: string): void {
    console.log('url------', url);

    if (url.includes('/flights')) {
      this.activeTab = 'flights-tab';
    } else if (url.includes('/hotel')) {
      this.activeTab = 'hotels-tab';
    } else if (url.includes('/cruise')) {
      this.activeTab = 'cruises-tab';
    } else if (url.includes('/packages')) {
      this.activeTab = 'packages-tab';
    } else if (url === '/' || url === '') {
      this.activeTab = 'home-tab';
    } else {
      this.activeTab = 'flights-tab';
      this.showHome = true; // fallback if no match
    }

    this.cdr.detectChanges();
  }
}
