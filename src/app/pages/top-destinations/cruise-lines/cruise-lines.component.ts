import { Component, inject } from '@angular/core';
import { TopDestinationsHeadComponent } from '../top-destinations-head/top-destinations-head.component';
import { TopDestinationsListComponent } from '../top-destinations-list/top-destinations-list.component';
import { MapModule } from '../../../core/map/map.module';
import { SharedService } from '../../../services/shared/shared.service';
import { CruisesTabComponent } from '../../../components/main-filter/cruises-tab/cruises-tab.component';

@Component({
  selector: 'app-cruise-lines',
  imports: [CruisesTabComponent,TopDestinationsHeadComponent,TopDestinationsListComponent,MapModule],
  templateUrl: './cruise-lines.component.html',
  styleUrl: './cruise-lines.component.scss'
})
export class CruiseLinesComponent {
 private shareService: SharedService = inject(SharedService);
    getData:any='';
    ngOnInit(){
      this.getData=this.shareService.getcompanyName();
    }
}
