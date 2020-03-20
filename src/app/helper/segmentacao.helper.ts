import { IDescricaoModelResultado } from '../models/imagem/descricao.model';

export class SegmentacaoHelper {

    filtrarDescricoesPorCodigo(vetorDescricao: IDescricaoModelResultado[], numeroCaracteres: number): IDescricaoModelResultado[] {

        let novoVetorDescricao = [];
        vetorDescricao.forEach(descricao => {
            if (descricao.codigo.toString().length == numeroCaracteres) {
                novoVetorDescricao.push(descricao);
            }
        });
        return novoVetorDescricao;
    }

    filtrarDescricoesPorPrefixo(vetorDescricao: IDescricaoModelResultado[], prefixo: string): IDescricaoModelResultado[] {

        let novoVetorDescricao = [];
        let inicio = 0;
        const caracteresLidos = prefixo.length;

        vetorDescricao.forEach(descricao => {
            if (descricao.codigo.toString().substring(inicio, caracteresLidos) == prefixo) {
                novoVetorDescricao.push(descricao);
            }
        });
        return novoVetorDescricao;
    }
}
