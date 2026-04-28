import { Component, inject } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-terms-condition',
  imports: [],
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.scss',
})
export class TermsConditionComponent {
  private shareService: SharedService = inject(SharedService);
  getData: any = '';

  ngOnInit(): void {
    this.getData = this.shareService.getcompanyName();
  }
}
