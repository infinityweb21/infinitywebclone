import { NgIf } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Drawer, DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-cruise-details',
  imports: [DrawerModule],
  templateUrl: './cruise-details.component.html',
  styleUrl: './cruise-details.component.scss',
})
export class CruiseDetailsComponent {
  private router = inject(Router);
  selectedTab: string = 'sailing';
  visible: boolean = false;
  showBonusOffers:boolean = true; 
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  navigateToPayment() {
    this.router.navigate(['/cruise-booking']);
  }
}
