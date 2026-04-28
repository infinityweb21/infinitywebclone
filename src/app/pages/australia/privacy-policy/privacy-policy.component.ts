import { Component, inject } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  private shareService: SharedService = inject(SharedService);
  getData: any = '';
  ngOnInit(): void {
    this.getData = this.shareService.getcompanyName();
   
  }
}
