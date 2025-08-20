import { Component } from '@angular/core';
import { MainFilterComponent } from "../../components/main-filter/main-filter.component";
import { FlightsTabComponent } from "../../components/main-filter/flights-tab/flights-tab.component";

@Component({
  selector: 'app-private-jet',
  imports: [FlightsTabComponent],
  templateUrl: './private-jet.component.html',
  styleUrl: './private-jet.component.scss'
})
export class PrivateJetComponent {

}
