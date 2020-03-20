import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacaoCarregamentoComponent } from './animacao-carregamento.component';

describe('AnimacaoCarregamentoComponent', () => {
  let component: AnimacaoCarregamentoComponent;
  let fixture: ComponentFixture<AnimacaoCarregamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimacaoCarregamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimacaoCarregamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
