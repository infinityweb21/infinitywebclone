import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-quick-contact',
  imports: [],
  templateUrl: './quick-contact.component.html',
  styleUrl: './quick-contact.component.scss',
})
export class QuickContactComponent {
  private shareService: SharedService = inject(SharedService);
  getData: any = '';
  ngOnInit() {
    this.getData = this.shareService.getcompanyName();
  }
}

