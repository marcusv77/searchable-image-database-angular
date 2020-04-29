import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CadastroVisitanteComponent } from "./cadastro-visitante.component";

describe("CadastroVisitanteComponent", () => {
    let component: CadastroVisitanteComponent;
    let fixture: ComponentFixture<CadastroVisitanteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CadastroVisitanteComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CadastroVisitanteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
