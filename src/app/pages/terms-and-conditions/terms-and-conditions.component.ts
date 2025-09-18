import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-terms-and-conditions',
  imports: [RouterLink],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent implements OnInit {
 private shareService: SharedService = inject(SharedService);
    getData:any='';
  
  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
        this.getData=this.shareService.getcompanyName();
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
    this.meta.updateTag({ name: 'keywords', content: 'terms and conditions, user agreement, website terms, legal terms, user rights, responsibilities' });
    this.meta.updateTag({ property: 'og:title', content: metaTitle || 'Terms and Conditions - Infinity Travel' });
    this.meta.updateTag({ property: 'og:description', content: metaDescription || 'Read our terms and conditions to understand your rights and responsibilities when using our website.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: metaTitle || 'Terms and Conditions - Infinity Travel' });
    this.meta.updateTag({ name: 'twitter:description', content: metaDescription || 'Read our terms and conditions to understand your rights and responsibilities when using our website.' });
  }
}
