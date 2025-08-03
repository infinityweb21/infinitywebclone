import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrDirective } from '../../../directives/flatpickr.directive';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-cruises-tab',
  imports: [FlatpickrDirective, ReactiveFormsModule],
  templateUrl: './cruises-tab.component.html',
  styleUrl: './cruises-tab.component.scss',
})
export class CruisesTabComponent {
  @Output() cruiseSubmittedForm = new EventEmitter<any>();
  private router = inject(Router);
  private searchService = inject(SearchService);
  cruisesForm!: FormGroup;

  constructor() {
    this.cruisesForm = new FormGroup({
      departureCruises: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  submitForm() {
     this.searchService.setSearchData(this.cruisesForm.value);
    // console.log(this.cruisesForm.value);
    this.router.navigate(['/cruises-list']);
  }
}
