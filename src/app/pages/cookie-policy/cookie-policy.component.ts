import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cookie-policy',
  imports: [],
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.scss'
})
export class CookiePolicyComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
    this.meta.updateTag({ name: 'keywords', content: 'cookie policy, privacy cookies, website cookies, tracking cookies, performance cookies, user consent' });
    this.meta.updateTag({ property: 'og:title', content: metaTitle || 'Cookie Policy - Infinity Travel' });
    this.meta.updateTag({ property: 'og:description', content: metaDescription || 'Learn about how we use cookies to improve your experience on our website.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: metaTitle || 'Cookie Policy - Infinity Travel' });
    this.meta.updateTag({ name: 'twitter:description', content: metaDescription || 'Learn about how we use cookies to improve your experience on our website.' });
  }
}
