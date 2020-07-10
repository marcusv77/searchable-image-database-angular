import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClassificationDatabaseComponent } from './user-classification-database.component';

describe('UserClassificationDatabaseComponent', () => {
  let component: UserClassificationDatabaseComponent;
  let fixture: ComponentFixture<UserClassificationDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClassificationDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClassificationDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
