export interface IUsuarioBaseModel {
  id: number;
  primeiro_nome: string;
  ultimo_nome: string;
  email: string;
  senha: string;
  ativo: number;
  createdAt: Date;
  updatedAt: Date;
}
