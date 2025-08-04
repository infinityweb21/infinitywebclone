import { Component, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { FlatpickrDirective } from '../../directives/flatpickr.directive';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { SliderModule } from 'primeng/slider';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-cruises-list',
  imports: [
    DrawerModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrDirective,
    SliderModule,
  ],
  templateUrl: './cruises-list.component.html',
  styleUrl: './cruises-list.component.scss',
})
export class CruisesListComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  private router: Router = inject(Router);
  private searchService = inject(SearchService);
  cruisesForm!: FormGroup;
  filterForm!: FormGroup;
  filtervisible: boolean = false;
  showGuestDropdown: boolean = false;
  selectedTab: string = 'recommended';
  rangeValues: number[] = [500, 20000];

  hotels = [
  {
    title: '3 Night Penang',
    ship: 'Navigator of the Seas',
    departure: 'Singapore, Republic Of Singapore',
    sailingDates: 'November 2026 • March 2027',
    price: 2349,
    offers: [
      'Cruises.com Rewards = Free Cash! Double points: Earn 20 points per $1 spent - 3 days left!',
      'Up to $50 Bonus Savings - Call',
      '60% Off Second Guest',
      '48-Hour Flash Sale: Up to $325 Instant Savings - Ends tomorrow!'
    ],
    imageUrl: 'https://img.freepik.com/free-photo/luxury-architecture-exterior-design_23-2151920970.jpg?t=st=1750490385~exp=1750493985~hmac=3f2dcdbb76dad2a569929d79ba200129f1afd3f179f52b105201a52656bae85f&w=1380'
  },
  {
    title: '4 Night Bali Cruise',
    ship: 'Voyager of the Seas',
    departure: 'Bali, Indonesia',
    sailingDates: 'December 2026 • April 2027',
    price: '$ 2999/night',
    offers: [
      'Early Bird Savings: 30% off - Limited time!',
      'Exclusive Onboard Credit $2000',
      'Free Specialty Dining Experience'
    ],
    imageUrl: 'https://img.freepik.com/free-photo/luxury-pool-villa-sunset_1232-4650.jpg'
  }
  // Add more items as needed
];
   private shareService: SharedService = inject(SharedService);
  getData:any='';

  constructor() {}
  
  ngOnInit(): void {
    this.getData=this.shareService.getcompanyName();

    this.cruisesForm = new FormGroup({
      departureCruises: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });

    this.filterForm = new FormGroup({
      priceRange: new FormControl(this.rangeValues),
      starRating: new FormControl(0),
      cancellationPolicy: new FormGroup({
        refundable: new FormControl(false),
        bookNow: new FormControl(false)
      }),
      amenities: new FormGroup({
        breakfast: new FormControl(false),
        parking: new FormControl(false),
        gym: new FormControl(false),
        wifi: new FormControl(false),
        pets: new FormControl(false),
        pool: new FormControl(false),
        bar: new FormControl(false)
      })
    });

    this.filterForm.valueChanges.subscribe((value) => {
    console.log('Filters changed:', value);
  });
  }

  clearFilters() {
    this.filterForm.reset({
      priceRange: [500, 20000],
      starRating: 0,
      cancellationPolicy: {
        refundable: false,
        bookNow: false
      },
      amenities: {
        breakfast: false,
        parking: false,
        gym: false,
        wifi: false,
        pets: false,
        pool: false,
        bar: false
      }
    });
  }

  submitForm() {
    this.searchService.setSearchData(this.cruisesForm.value);
    // console.log(this.cruisesForm.value);
    this.router.navigate(['/cruises-list']);
  }

  navigateToDetails() {
    this.router.navigate(['/cruise-details']);
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
