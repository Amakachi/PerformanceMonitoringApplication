import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmodComponent } from './detailsmod.component';

describe('DetailsmodComponent', () => {
  let component: DetailsmodComponent;
  let fixture: ComponentFixture<DetailsmodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsmodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsmodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
