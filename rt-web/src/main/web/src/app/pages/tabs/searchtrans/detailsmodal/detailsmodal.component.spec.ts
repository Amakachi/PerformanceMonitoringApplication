import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmodalComponent } from './detailsmodal.component';

describe('DetailsmodalComponent', () => {
  let component: DetailsmodalComponent;
  let fixture: ComponentFixture<DetailsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
