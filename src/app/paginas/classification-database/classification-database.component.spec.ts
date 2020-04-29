import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClassificationDatabaseComponent } from "./classification-database.component";

describe("ClassificationDatabaseComponent", () => {
    let component: ClassificationDatabaseComponent;
    let fixture: ComponentFixture<ClassificationDatabaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ClassificationDatabaseComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClassificationDatabaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
