import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListarCardsImagemComponent } from "./listar-cards-imagem.component";

describe("ListarCardsImagemComponent", () => {
  let component: ListarCardsImagemComponent;
  let fixture: ComponentFixture<ListarCardsImagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCardsImagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCardsImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
