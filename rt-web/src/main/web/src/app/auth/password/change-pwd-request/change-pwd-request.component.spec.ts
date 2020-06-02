import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwdRequestComponent } from './change-pwd-request.component';

describe('ChangePwdRequestComponent', () => {
  let component: ChangePwdRequestComponent;
  let fixture: ComponentFixture<ChangePwdRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePwdRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePwdRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
