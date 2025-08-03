import { Component } from '@angular/core';
import { MainFilterComponent } from '../../../components/main-filter/main-filter.component';
import { FlightsTabComponent } from '../../../components/main-filter/flights-tab/flights-tab.component';
import { TopDestinationsHeadComponent } from '../top-destinations-head/top-destinations-head.component';
import { TopDestinationsListComponent } from '../top-destinations-list/top-destinations-list.component';
import { HotelsTabComponent } from '../../../components/main-filter/hotels-tab/hotels-tab.component';
import { MapModule } from '../../../core/map/map.module';

@Component({
  selector: 'app-singapore',
  imports: [FlightsTabComponent,TopDestinationsHeadComponent,TopDestinationsListComponent,HotelsTabComponent,MapModule],
  templateUrl: './singapore.component.html',
  styleUrl: './singapore.component.scss'
})
export class SingaporeComponent {
lat: number = 1.3521;
lng: number = 103.8198;
}
