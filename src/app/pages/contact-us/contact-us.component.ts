import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
   private shareService: SharedService = inject(SharedService);
  getData:any='';

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Set meta tags
    this.getData=this.shareService.getcompanyName();

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
    this.meta.updateTag({ name: 'keywords', content: 'contact us, customer support, travel assistance, infinity travel contact, help desk, travel support' });
    this.meta.updateTag({ property: 'og:title', content: metaTitle || 'Contact Us - Infinity Travel' });
    this.meta.updateTag({ property: 'og:description', content: metaDescription || 'Get in touch with our travel experts for assistance with your booking and travel needs.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: metaTitle || 'Contact Us - Infinity Travel' });
    this.meta.updateTag({ name: 'twitter:description', content: metaDescription || 'Get in touch with our travel experts for assistance with your booking and travel needs.' });
  }
}
