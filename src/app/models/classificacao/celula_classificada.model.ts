import { ILesaoModelResultado } from "../imagem/lesao.model";

export interface ICelulaClassificadaModelResultado {
    id_celula: number;
    id_classificacao: number;
    tipo_analise_realizada: string;
    coord_centro_nucleo_x: number;
    coord_centro_nucleo_y: number;
    lesao: ILesaoModelResultado;
}
