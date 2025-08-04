import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/common/spinner.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {
  diparture:string='';
  arrival:string='';
   private shareService: SharedService = inject(SharedService);
    getData:any='';
  
constructor(public spinnerService: SpinnerService,private searchService:SearchService){
  console.log(this.spinnerService)
}
ngOnInit(): void {
      this.getData=this.shareService.getcompanyName();
  this.searchService.searchData$.subscribe((searchData) => {
    if (searchData) {
      if (searchData.tripType !== 'multicity') {
        console.log("searchData.OriginDestination[0].DepartureLocationCode",searchData.OriginDestination[0].DepartureLocationCode)
        this.diparture = searchData.OriginDestination[0].DepartureLocationCode.code;
        this.arrival = searchData.OriginDestination[0].ArrivalLocationCode.code;
      } else if (searchData.tripType === 'multicity') {
        const lastIndex = searchData.OriginDestination.length - 1;
                console.warn("searchData",lastIndex)

        this.diparture = searchData.OriginDestination[0].DepartureLocationCode.code;
        this.arrival = searchData.OriginDestination[lastIndex].ArrivalLocationCode.code;
      }
    }
  });
}

}
