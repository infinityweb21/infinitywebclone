import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { Drawer } from 'primeng/drawer';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-header',
  imports: [DrawerModule, RouterLink,  RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  visible: boolean = false;
  submenuOpen: boolean = false;
  profileDropdownOpen: boolean = false;
  isCurrencyDropdownShown: boolean = false;

  toggleSubmenu(event: Event): void {
    event.preventDefault();
    this.submenuOpen = !this.submenuOpen;
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    if (width > 991 && this.visible) {
      this.drawerRef.close(event);
      this.visible = false;
      this.submenuOpen = false;
    }
  }

  toggleProfileDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }
  closeCurrencyDropdown(): void {
    this.isCurrencyDropdownShown = false;
  }

  closeProfileDropdown(): void {
    this.profileDropdownOpen = false;
  }
  toggleCurrencyDropdown(): void {
    this.isCurrencyDropdownShown = !this.isCurrencyDropdownShown;
  }
   private shareService: SharedService = inject(SharedService);
  getData:any='';
ngOnInit(){
this.getData=this.shareService.getcompanyName();
}
}
