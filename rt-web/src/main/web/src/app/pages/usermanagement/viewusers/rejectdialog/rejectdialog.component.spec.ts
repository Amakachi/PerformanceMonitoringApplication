import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectdialogComponent } from './rejectdialog.component';

describe('RejectdialogComponent', () => {
  let component: RejectdialogComponent;
  let fixture: ComponentFixture<RejectdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
