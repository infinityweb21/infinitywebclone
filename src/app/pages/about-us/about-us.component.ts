import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';


@Component({
  selector: 'app-about-us',
  imports: [RouterLink],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  // Company Name Get
  private shareService: SharedService = inject(SharedService);
  companyName: string='';
  phoneNumber: string='';

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Company Name Get
    const data = this.shareService.getcompanyName();
    this.companyName = data.companyName;
    this.phoneNumber = data.phoneNumber;

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
    this.meta.updateTag({ name: 'keywords', content: 'about us, travel experts, infinity travel, travel company, global travel, travel planning' });
    this.meta.updateTag({ property: 'og:title', content: metaTitle || 'About Us - Infinity Travel' });
    this.meta.updateTag({ property: 'og:description', content: metaDescription || 'Learn about Infinity Travel and our commitment to exceptional travel experiences.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: metaTitle || 'About Us - Infinity Travel' });
    this.meta.updateTag({ name: 'twitter:description', content: metaDescription || 'Learn about Infinity Travel and our commitment to exceptional travel experiences.' });
  }
}


