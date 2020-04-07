import { LesaoEntidade } from "./lesao.entidade";

export class ImagemEntidade {
    id: number;
    nome: string;
    codigo_lamina: string;
    excluida: number;
    classificacao_aprovada: number;
    dt_aquisicao: Date;
    fonte_aquisicao: number;
    caminho_imagem: string;
    id_usuario: number;
    lesao: LesaoEntidade;
    largura: number;
    altura: number;
}
