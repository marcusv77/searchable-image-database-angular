import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClassificarImagemComponent } from "./classificar-imagem.component";

describe("ClassificarImagemComponent", () => {
    let component: ClassificarImagemComponent;
    let fixture: ComponentFixture<ClassificarImagemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ClassificarImagemComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClassificarImagemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
