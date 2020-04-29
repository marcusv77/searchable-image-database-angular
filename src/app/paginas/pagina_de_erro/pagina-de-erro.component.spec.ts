import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PaginaDeErroComponent } from "./pagina-de-erro.component";

describe("PaginaDeErroComponent", () => {
    let component: PaginaDeErroComponent;
    let fixture: ComponentFixture<PaginaDeErroComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PaginaDeErroComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginaDeErroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
