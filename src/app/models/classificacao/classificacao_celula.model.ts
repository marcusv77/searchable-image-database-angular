import { IAnalistaModelResultado } from "../usuario/analista.model";
import { ICelulaClassificadaModelResultado } from "./celula_classificada.model";

export interface IClassificacaoCelulaModelResultado {
    id_imagem: number;
    analista: IAnalistaModelResultado;
    celulas: ICelulaClassificadaModelResultado[];
}
