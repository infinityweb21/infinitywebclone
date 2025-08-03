import { Component } from '@angular/core';
import { MainFilterComponent } from '../../../components/main-filter/main-filter.component';
import { FlightsTabComponent } from '../../../components/main-filter/flights-tab/flights-tab.component';
import { TopDestinationsHeadComponent } from '../top-destinations-head/top-destinations-head.component';
import { TopDestinationsListComponent } from '../top-destinations-list/top-destinations-list.component';
import { HotelsTabComponent } from '../../../components/main-filter/hotels-tab/hotels-tab.component';
import { MapModule } from '../../../core/map/map.module';

@Component({
  selector: 'app-california',
  imports: [FlightsTabComponent,TopDestinationsHeadComponent,TopDestinationsListComponent,HotelsTabComponent,MapModule],
  templateUrl: './california.component.html',
  styleUrl: './california.component.scss'
})
export class CaliforniaComponent {
  lat: number = 34.0522;
  lng: number = -118.2437;
}
