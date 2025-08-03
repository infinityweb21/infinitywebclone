import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstanbulComponent } from './istanbul.component';

describe('IstanbulComponent', () => {
  let component: IstanbulComponent;
  let fixture: ComponentFixture<IstanbulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IstanbulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstanbulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
