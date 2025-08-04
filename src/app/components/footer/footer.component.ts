import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent  {
  private shareService: SharedService = inject(SharedService);
  getData:any='';
ngOnInit(){
this.getData=this.shareService.getcompanyName();
}
}
