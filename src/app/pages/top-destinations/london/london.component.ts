import { Component } from '@angular/core';
import { MainFilterComponent } from '../../../components/main-filter/main-filter.component';
import { FlightsTabComponent } from '../../../components/main-filter/flights-tab/flights-tab.component';
import { TopDestinationsHeadComponent } from '../top-destinations-head/top-destinations-head.component';
import { TopDestinationsListComponent } from '../top-destinations-list/top-destinations-list.component';

@Component({
  selector: 'app-london',
  imports: [FlightsTabComponent,TopDestinationsHeadComponent,TopDestinationsListComponent],
  templateUrl: './london.component.html',
  styleUrl: './london.component.scss'
})
export class LondonComponent {

}
