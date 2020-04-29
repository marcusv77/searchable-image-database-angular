import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CadastrarImagemComponent } from "./cadastrar-imagem.component";

describe("CadastrarImagemComponent", () => {
    let component: CadastrarImagemComponent;
    let fixture: ComponentFixture<CadastrarImagemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CadastrarImagemComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CadastrarImagemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
