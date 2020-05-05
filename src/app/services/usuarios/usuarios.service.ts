import { Injectable } from "@angular/core";

import { ComunicacaoApi } from "../../api_cric_database/comunicacao_api";
import { IUsuarioBaseModel } from "src/app/models/usuario/usuario_base.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";
import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";

@Injectable()
export class UsuarioService {

    private autenicacaoApiParaLogin: string;
    private autenticacaoCadastroVisitante: string;
    private armazenamentoBrowser: ArmazenamentoBrowser;
    private objetoSessao: IObjetoSessaoModel;
    private headerApplicationJsonTokenSessao: HttpHeaders;
    private api: ComunicacaoApi;

    constructor(private httpClient: HttpClient) {  }


    inicializarServicos() {

        this.api = new ComunicacaoApi();
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));

        if(this.objetoSessao) {

            this.headerApplicationJsonTokenSessao = new HttpHeaders({
                "content-type": "application/json",
                token_autenticacao: this.objetoSessao.token_autenticacao
            });
        }
    }

    obterTodosUsuarios(): Observable<IUsuarioBaseModel[]> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/usuarios`;

        return this.httpClient.get<IUsuarioBaseModel[]>(url, {
            headers: this.headerApplicationJsonTokenSessao
        });
    }

    obterUsuarioCompleto(id: number = 0, body: any): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/usuarios/${id}`;

        return this.httpClient.post(url, body, {
            headers: this.headerApplicationJsonTokenSessao
        });
    }

    obterUsuarioCompletoParaLogin(body: any): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/login/`;

        return this.httpClient.post(url, body, {
            headers: new HttpHeaders({
                "content-type": "application/json; charset=utf-8"
            })
        });
    }

    cadastrarVisitante(body: any): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/usuarios-visitante`;

        return this.httpClient.post(url, body, {
            headers: new HttpHeaders({
                "content-type": "application/json"
            })
        });
    }

    fazerLogOff(token_autenticacao: string): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}/api/v1/usuarios/${token_autenticacao}`;

        return this.httpClient.delete(url, {
            headers: new HttpHeaders({
                "content-type": "application/json",
                token_autenticacao
            })
        });
    }

    cadastrarAnalista(id_usuario: number): Observable<any> {

        this.inicializarServicos();
        const body = {nome: "teste" };

        const url = `${this.api.obterUrlBaseApi()}/api/v1/usuarios/analista/${id_usuario}`;

        return this.httpClient.post(url, body, {
            headers: new HttpHeaders({
                "content-type": "application/json; charset=utf-8",
                token_autenticacao: this.autenticacaoCadastroVisitante
            })
        });
    }
}
