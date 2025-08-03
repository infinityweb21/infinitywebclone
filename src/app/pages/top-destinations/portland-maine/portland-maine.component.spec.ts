import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortlandMaineComponent } from './portland-maine.component';

describe('PortlandMaineComponent', () => {
  let component: PortlandMaineComponent;
  let fixture: ComponentFixture<PortlandMaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortlandMaineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortlandMaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
