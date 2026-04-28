import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { SpinnerService } from '../../services/common/spinner.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CookiesComponent } from '../../components/cookies/cookies.component';
import { QuickContactComponent } from '../../components/quick-contact/quick-contact.component';
import { SharedService } from '../../services/shared/shared.service';
import { UnderMaintenanceComponent } from "../../pages/home/under-maintenance/under-maintenance.component";

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    CommonModule,
    CookiesComponent,
    QuickContactComponent,
    UnderMaintenanceComponent
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isLoading = false;
  private sub!: Subscription;
shareService:SharedService=inject(SharedService)

  showCookies:boolean=true;
  private cookieSub!: Subscription;

  constructor(
    public spinnerService: SpinnerService,
  ) {
    const showCookies=localStorage.getItem("showCookies");
    if(showCookies=='false'){
      this.showCookies=false;
    }else{
      this.showCookies=true;
    }
  }

  ngOnInit(): void {
    this.sub = this.spinnerService.isLoading$.subscribe((val) => {
      
      this.isLoading = val;
      console.log("main",val);
    });
  this.cookieSub = this.shareService.showCookies$.subscribe((val) => {
      this.showCookies = val;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.cookieSub?.unsubscribe();
  }
}
