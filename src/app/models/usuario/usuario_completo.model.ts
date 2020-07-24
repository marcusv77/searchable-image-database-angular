export interface UsuarioCompletoModel {
    id: number;
    primeiro_nome: string;
    ultimo_nome: string;
    email: string;
    senha: string;
    ativo: number;
    admin: boolean;
}
