import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink,NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent  {
  private shareService: SharedService = inject(SharedService);
  getData:any='';
    hidePopup = false;

ngOnInit(){
this.getData=this.shareService.getcompanyName();
    this.checkMobileView();

}
 isScrolled = false;
  isMobile = false;



  // Detect scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50; // you can fine-tune the value
  }

  // Detect screen width
  @HostListener('window:resize', [])
  checkMobileView() {
    this.isMobile = window.innerWidth <= 768; // adjust breakpoint as needed
  }
   closeDetailsPopup(): void {
    this.hidePopup = true;
  }
}
