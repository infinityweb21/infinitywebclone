import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit {
  // Company Name Get
  private shareService: SharedService = inject(SharedService);
  companyName: string = '';

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Company Name Get
    const data = this.shareService.getcompanyName();
    this.companyName = data.appName;

    // Set meta tags
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
    this.meta.updateTag({ name: 'keywords', content: 'customer testimonials, travel reviews, flight booking reviews, hotel reviews, cruise reviews, traveler stories' });
    this.meta.updateTag({ property: 'og:title', content: metaTitle || 'Customer Testimonials - Infinity Travel' });
    this.meta.updateTag({ property: 'og:description', content: metaDescription || 'Read honest reviews from travelers about their booking experiences with flights, hotels, and cruises.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: metaTitle || 'Customer Testimonials - Infinity Travel' });
    this.meta.updateTag({ name: 'twitter:description', content: metaDescription || 'Read honest reviews from travelers about their booking experiences with flights, hotels, and cruises.' });
  }
}
