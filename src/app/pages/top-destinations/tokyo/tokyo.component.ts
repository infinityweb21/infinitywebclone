import { Component } from '@angular/core';
import { MainFilterComponent } from '../../../components/main-filter/main-filter.component';
import { FlightsTabComponent } from '../../../components/main-filter/flights-tab/flights-tab.component';
import { TopDestinationsHeadComponent } from '../top-destinations-head/top-destinations-head.component';
import { TopDestinationsListComponent } from '../top-destinations-list/top-destinations-list.component';
import { HotelsTabComponent } from '../../../components/main-filter/hotels-tab/hotels-tab.component';
import { MapModule } from '../../../core/map/map.module';

@Component({
  selector: 'app-tokyo',
  imports: [FlightsTabComponent,TopDestinationsHeadComponent,TopDestinationsListComponent,HotelsTabComponent,MapModule],
  templateUrl: './tokyo.component.html',
  styleUrl: './tokyo.component.scss'
})
export class TokyoComponent {
lat: number = 35.6895;
lng: number = 139.6917;
}
