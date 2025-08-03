import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HeroComponent } from "./hero/hero.component";
import { RecoendOfferComponent } from "./recoend-offer/recoend-offer.component";
import { PopularTravelComponent } from "./popular-travel/popular-travel.component";

@Component({
  selector: 'app-home',
  imports: [ HeroComponent, RecoendOfferComponent, PopularTravelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get meta data from route
    const metaTitle = this.route.snapshot.data['metaTitle'];
    const metaDescription = this.route.snapshot.data['metaDescription'];

    // Set title
    if (metaTitle) {
      this.title.setTitle(metaTitle);
    }

    // Set meta description
    if (metaDescription) {
      this.meta.updateTag({ name: 'description', content: metaDescription });
    }

    // Set additional meta tags for better SEO
    this.meta.updateTag({ name: 'keywords', content: 'travel, flights, hotels, cruises, booking, vacation, travel deals' });
    this.meta.updateTag({ property: 'og:title', content: metaTitle || 'Your One-Stop Travel Platform' });
    this.meta.updateTag({ property: 'og:description', content: metaDescription || 'Book flights, hotels, and cruises in one place.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: metaTitle || 'Your One-Stop Travel Platform' });
    this.meta.updateTag({ name: 'twitter:description', content: metaDescription || 'Book flights, hotels, and cruises in one place.' });
  }
}
