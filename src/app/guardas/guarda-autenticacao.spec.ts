import { TestBed } from '@angular/core/testing';

import { GuardaAutenticacao } from './guarda-autenticacao';

describe('GuardaAuteiticacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardaAutenticacao = TestBed.get(GuardaAutenticacao);
    expect(service).toBeTruthy();
  });
});
