import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    CommonModule,
    CookiesComponent,
    QuickContactComponent

  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isLoading = false;
  private sub!: Subscription;




  constructor(
    public spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.sub = this.spinnerService.isLoading$.subscribe((val) => {
      
      this.isLoading = val;
      console.log("main",val);
    });

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
