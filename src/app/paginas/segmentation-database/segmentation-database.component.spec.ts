import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SegmentationDatabaseComponent } from "./segmentation-database.component";

describe("SegmentationDatabaseComponent", () => {
  let component: SegmentationDatabaseComponent;
  let fixture: ComponentFixture<SegmentationDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
