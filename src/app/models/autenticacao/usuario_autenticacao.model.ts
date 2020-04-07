import { UsuarioCompletoModel } from "../usuario/usuario_completo.model";

export interface UsuarioAutenticacaoModelRequisicao {
    usuario: UsuarioCompletoModel;
    token_autenticacao: string;
}
