import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateJetComponent } from './private-jet.component';

describe('PrivateJetComponent', () => {
  let component: PrivateJetComponent;
  let fixture: ComponentFixture<PrivateJetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateJetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateJetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
