import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInjuryComponent } from './admin-injury.component';

describe('AdminInjuryComponent', () => {
  let component: AdminInjuryComponent;
  let fixture: ComponentFixture<AdminInjuryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInjuryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInjuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
