import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderKycModalComponent } from './sender-kyc-modal.component';

describe('SenderKycModalComponent', () => {
  let component: SenderKycModalComponent;
  let fixture: ComponentFixture<SenderKycModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderKycModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderKycModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
