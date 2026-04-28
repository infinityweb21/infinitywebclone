import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-leadthankyou',
  templateUrl: './leadthankyou.component.html',
  styleUrls: ['./leadthankyou.component.scss']
})
export class LeadthankyouComponent {

  public shareService: SharedService = inject(SharedService);
  getData: any = '';
  ngOnInit() {
    this.getData = this.shareService.getcompanyName();
  }
}
