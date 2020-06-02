import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverKycModalComponent } from './receiver-kyc-modal.component';

describe('ReceiverKycModalComponent', () => {
  let component: ReceiverKycModalComponent;
  let fixture: ComponentFixture<ReceiverKycModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverKycModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverKycModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
