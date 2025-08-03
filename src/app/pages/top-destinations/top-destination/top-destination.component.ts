import { Component } from '@angular/core';
import { FlightsTabComponent } from '../../../components/main-filter/flights-tab/flights-tab.component';
import { TopDestinationsHeadComponent } from '../top-destinations-head/top-destinations-head.component';
import { TopDestinationsListComponent } from '../top-destinations-list/top-destinations-list.component';
import { MapModule } from '../../../core/map/map.module';

@Component({
  selector: 'app-top-destination',
  imports: [FlightsTabComponent,TopDestinationsHeadComponent,TopDestinationsListComponent,MapModule],
  templateUrl: './top-destination.component.html',
  styleUrl: './top-destination.component.scss'
})
export class TopDestinationComponent {

}
