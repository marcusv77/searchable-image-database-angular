import { IAnalistaModelResultado } from "../usuario/analista.model";
import { ICelulaSegmentadaModelResultado } from "./celula_segmentada.model";

export interface ISegmentacaoCelulaModelResultado {
    id_imagem: number;
    analista: IAnalistaModelResultado;
    celulas: ICelulaSegmentadaModelResultado[];
}
