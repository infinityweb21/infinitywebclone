import { Component } from '@angular/core';
import { MainFilterComponent } from '../../../components/main-filter/main-filter.component';
import { FlightsTabComponent } from '../../../components/main-filter/flights-tab/flights-tab.component';
import { TopDestinationsHeadComponent } from '../top-destinations-head/top-destinations-head.component';
import { TopDestinationsListComponent } from '../top-destinations-list/top-destinations-list.component';
import { HotelsTabComponent } from '../../../components/main-filter/hotels-tab/hotels-tab.component';
import { MapModule } from '../../../core/map/map.module';

@Component({
  selector: 'app-san-francisco',
  imports: [FlightsTabComponent,TopDestinationsHeadComponent,TopDestinationsListComponent,HotelsTabComponent,MapModule],
  templateUrl: './san-francisco.component.html',
  styleUrl: './san-francisco.component.scss'
})
export class SanFranciscoComponent {
lat: number = 37.7749;
lng: number = -122.4194;
}
