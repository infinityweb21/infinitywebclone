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

  dropdownVisible: boolean = false;
forceDropdown: boolean = false; // For mobile view at top

ngOnInit(): void {
    this.getData = this.shareService.getcompanyName();
  this.checkScrollPosition();
  window.addEventListener('scroll', this.checkScrollPosition.bind(this));
  window.addEventListener('resize', this.checkScrollPosition.bind(this));
}

ngOnDestroy(): void {
  window.removeEventListener('scroll', this.checkScrollPosition.bind(this));
  window.removeEventListener('resize', this.checkScrollPosition.bind(this));
}

showDropdown(): void {
  this.dropdownVisible = true;
}

hideDropdown(): void {
  this.dropdownVisible = false;
}

toggleDropdown(): void {
  this.dropdownVisible = !this.dropdownVisible;
}

// Detect scroll + mobile view
checkScrollPosition(): void {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const isMobile = window.innerWidth <= 768;

  this.forceDropdown = isMobile && scrollTop < 50;
}

}

