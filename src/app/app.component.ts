import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouteListenerService } from './services/shared/route-listner.service';
import { filter } from 'rxjs/internal/operators/filter';
import { NgxSpinnerModule } from 'ngx-spinner'; // Importing the module here

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'the-infinity-travel';
  private routeListener = inject(RouteListenerService);
  private router:Router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
