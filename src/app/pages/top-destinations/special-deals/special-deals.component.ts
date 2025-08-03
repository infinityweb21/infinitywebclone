import { Component } from '@angular/core';
import { FlightsTabComponent } from '../../../components/main-filter/flights-tab/flights-tab.component';
import { TopDestinationsHeadComponent } from '../top-destinations-head/top-destinations-head.component';
import { TopDestinationsListComponent } from '../top-destinations-list/top-destinations-list.component';
import { MapModule } from '../../../core/map/map.module';

@Component({
  selector: 'app-special-deals',
  imports: [FlightsTabComponent,TopDestinationsHeadComponent,TopDestinationsListComponent,MapModule],
  templateUrl: './special-deals.component.html',
  styleUrl: './special-deals.component.scss'
})
export class SpecialDealsComponent {

}
