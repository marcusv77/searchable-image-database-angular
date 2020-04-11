import { IDescricaoModelResultado } from '../imagem/descricao.model';
import { ISegmentoCitoplasmaModelResultado } from './segmento_citoplasma.model';
import { ISegmentoNucleoModelResultado } from './segmento_nucleo.model';

export interface ICelulaSegmentadaModelResultado {
    id: number,
    tipo_analise_realizada: string,
    descricao: IDescricaoModelResultado,
    segmentos_citoplasma: ISegmentoCitoplasmaModelResultado[],
    segmentos_nucleo: ISegmentoNucleoModelResultado[],

}