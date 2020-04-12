import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { ComunicacaoApi } from "../../api_cric_database/comunicacao_api";
import { IImagemModelResultado } from "../../models/imagem/imagem.model";
import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { ILesaoModelResultado } from "src/app/models/imagem/lesao.model";
import { IDescricaoModelResultado } from "src/app/models/imagem/descricao.model";
import { IClassificacaoCelulaModelResultado } from "src/app/models/classificacao/classificacao_celula.model";
import { ISegmentacaoCelulaModelResultado } from "src/app/models/segmentacao/segmentacao_celula.model";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";
import { IEstatisticaCelulasDoentesModelResultado } from "src/app/models/imagem/estatistica_celulas_doentes.model";

@Injectable()
export class ImagemService {

    //#region Propriedades
    private armazenamentoBrowser: ArmazenamentoBrowser;
    private objetoSessao: IObjetoSessaoModel;
    private headerApplicationJson: HttpHeaders;
    private headerMultipartFormData: HttpHeaders;
    private headerDownloadArquivo: HttpHeaders;
    private api: ComunicacaoApi;
    //#endregion

    //#region constructor
    constructor(private httpClient: HttpClient) { }
    //#endregion

    //#region Metodos
    inicializarServicos() {

        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
        this.api = new ComunicacaoApi();

        this.headerApplicationJson = new HttpHeaders({
            "content-type": "application/json; charset=utf-8",
            token_autenticacao: "bac8db9147ac80b4ba8a05bb0de7c4fd"
        });

        this.headerMultipartFormData = new HttpHeaders({
            // FIXME
            token_autenticacao: "bac8db9147ac80b4ba8a05bb0de7c4fd"
        });

        this.headerDownloadArquivo = new HttpHeaders({
            token_autenticacao: "bac8db9147ac80b4ba8a05bb0de7c4fd",
            responseType: "blob"
        });
    }

    cadastrarImagem(formulario: FormData): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens`;

        return this.httpClient.post<any>(url, formulario, {
            headers: this.headerMultipartFormData
        });
    }

    obterContagemNucleosDoentes(): Observable<IEstatisticaCelulasDoentesModelResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/contagem/lesoes/descricoes`;

        return this.httpClient.get<IEstatisticaCelulasDoentesModelResultado>(url, {
            headers: this.headerApplicationJson
        });
    }

    listarTodasImagens(id_usuario: number): Observable<IImagemModelResultado[]> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/listar/${id_usuario}`;

        return this.httpClient.get<IImagemModelResultado[]>(url, {
            headers: this.headerApplicationJson
        });
    }

    obterImagem(id_imagem: number): Observable<IImagemModelResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/${id_imagem}`;

        return this.httpClient.get<IImagemModelResultado>(url, {
            headers: this.headerApplicationJson
        });
    }

    listarLesoes(): Observable<ILesaoModelResultado[]> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens-lesoes`;

        return this.httpClient.get<ILesaoModelResultado[]>(url, {
            headers: this.headerApplicationJson
        });
    }

    listarDescricoes(): Observable<IDescricaoModelResultado[]> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens-descricoes`;

        return this.httpClient.get<IDescricaoModelResultado[]>(url, {
            headers: this.headerApplicationJson
        });
    }

    listarClassificacoesCelula(id_imagem: number, id_analista: number): Observable<IClassificacaoCelulaModelResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/${id_imagem}/listar-classificacao-celula/${id_analista}`;

        return this.httpClient.get<IClassificacaoCelulaModelResultado>(url, {
            headers: this.headerApplicationJson
        });
    }

    listarSegmentacoesCelula(id_imagem: number, id_analista: number): Observable<ISegmentacaoCelulaModelResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/${id_imagem}/listar-segmentacao-celula/${id_analista}`;

        return this.httpClient.get<ISegmentacaoCelulaModelResultado>(url, {
            headers: this.headerApplicationJson
        });
    }

    cadastrarClassificacao(id_imagem: number, id_analista: number, body: any): Observable<IImagemModelResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/${id_imagem}/classificacao-celula/${id_analista}`;

        return this.httpClient.post<IImagemModelResultado>(url, body, {
            headers: this.headerApplicationJson
        });
    }

    cadastrarSegmentacao(id_imagem: number, id_analista: number, body: any): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/${id_imagem}/segmentacao-celula/${id_analista}`;

        return this.httpClient.post(url, body, {
            headers: this.headerApplicationJson
        });
    }

    fazerDownloadImagensBaseInterna(id_usuario: string): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/download/base_interna_cvx/${id_usuario}`;

        return this.httpClient.get(url, {
            headers: this.headerDownloadArquivo,
            responseType: "blob"
        });
    }

    fazerDownloadImagensBaseExterna(id_usuario: string): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/download/base_externa_cvx/${id_usuario}`;

        return this.httpClient.get(url, {
            headers: this.headerDownloadArquivo,
            responseType: "blob"
        });
    }

    excluirRegistroDeClassificacao(requisicao: any): Observable<IImagemModelResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/${requisicao.id_imagem}/classificacao-celula/${requisicao.id_celula}/usuario/${requisicao.id_usuario}`;

        return this.httpClient.delete<IImagemModelResultado>(url, {
            headers: this.headerApplicationJson
        });
    }

    excluirRegistroDeSegmentacao(requisicao: any): Observable<ISegmentacaoCelulaModelResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/${requisicao.id_imagem}/segmentacao-celula/${requisicao.id_celula}/usuario/${requisicao.id_usuario}`;

        return this.httpClient.delete<ISegmentacaoCelulaModelResultado>(url, {
            headers: this.headerApplicationJson
        });
    }

    atualizarDadosImagem(id_imagem: number, id_usuario: number, body: any): Observable<IImagemModelResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/imagens/${id_imagem}/atualizar/${id_usuario}`;

        return this.httpClient.put<IImagemModelResultado>(url, body, {
            headers: this.headerApplicationJson
        });
    }
    //#endregion
}
