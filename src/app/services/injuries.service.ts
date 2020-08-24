import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { ComunicacaoApi } from "src/app/api_cric_database/comunicacao_api";
import { IImagemModelResultado } from "src/app/models/imagem/imagem.model";
import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { ILesaoModelResultado } from "src/app/models/imagem/lesao.model";
import { IDescricaoModelResultado } from "src/app/models/imagem/descricao.model";
import { ICelulaClassificadaModelResultado } from "src/app/models/classificacao/celula_classificada.model";
import { IClassificacaoCelulaModelResultado } from "src/app/models/classificacao/classificacao_celula.model";
import { ISegmentacaoCelulaModelResultado } from "src/app/models/segmentacao/segmentacao_celula.model";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";
import { IEstatisticaCelulasDoentesModelResultado } from "src/app/models/imagem/estatistica_celulas_doentes.model";

@Injectable()
export class InjuriesService {

    private armazenamentoBrowser: ArmazenamentoBrowser;
    private objetoSessao: IObjetoSessaoModel;
    private headerApplicationJson: HttpHeaders;
    private headerMultipartFormData: HttpHeaders;
    private headerDownloadArquivo: HttpHeaders;
    private api: ComunicacaoApi;

    constructor(private httpClient: HttpClient) { }

    inicializarServicos() {

        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
        this.api = new ComunicacaoApi();

        if (this.objetoSessao) {
            this.headerApplicationJson = new HttpHeaders({
                "content-type": "application/json; charset=utf-8",
                Authorization: this.objetoSessao.Authorization
            });

            this.headerMultipartFormData = new HttpHeaders({
                Authorization: this.objetoSessao.Authorization
            });

            this.headerDownloadArquivo = new HttpHeaders({
                Authorization: this.objetoSessao.Authorization,
                responseType: "blob"
            });
        }
        else {
            this.headerApplicationJson = new HttpHeaders({
                "content-type": "application/json; charset=utf-8"
            });

            this.headerMultipartFormData = new HttpHeaders({
            });

            this.headerDownloadArquivo = new HttpHeaders({
                responseType: "blob"
            });
        }
    }

    listarLesoes(): Observable<ILesaoModelResultado[]> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/lesoes`;

        return this.httpClient.get<ILesaoModelResultado[]>(url, {
            headers: this.headerApplicationJson
        });
    }

    create_injury(injury:any): any {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/lesoes`;

        return this.httpClient.post(
            url,
            injury,
            {
                headers: this.headerApplicationJson
            }
        );
    }

    edit_injury(injury_id: number, injury:any): any {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/lesoes/${injury_id}`;

        return this.httpClient.put(
            url,
            injury,
            {
                headers: this.headerApplicationJson
            }
        );
    }

}
