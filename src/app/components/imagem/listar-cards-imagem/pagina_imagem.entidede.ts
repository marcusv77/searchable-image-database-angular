import { LesaoEntidade } from "./../../../paginas/classificar-imagem/lesao.entidade";

export class PaginaImagemEntidade {
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
    total_segmentacoes: number;
    total_classificacoes: number;
}
