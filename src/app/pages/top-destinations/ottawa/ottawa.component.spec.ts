import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OttawaComponent } from './ottawa.component';

describe('OttawaComponent', () => {
  let component: OttawaComponent;
  let fixture: ComponentFixture<OttawaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OttawaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OttawaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
