import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ComunicacaoApi } from "src/app/api_cric_database/comunicacao_api";
import { Observable } from "rxjs";
import { IStatusSistemaResultado } from "src/app/models/sistema/status_sistema.model";

@Injectable({
    providedIn: "root"
})
export class ConexaoService {

    private api: ComunicacaoApi;

    constructor(private httpClient: HttpClient) { }


    inicializarServicos() {
        this.api = new ComunicacaoApi();
    }

    verificarEstadoDaConexao(): Observable<IStatusSistemaResultado> {

        this.inicializarServicos();
        const url = `${this.api.obterUrlBaseApi()}`;

        return this.httpClient.get<IStatusSistemaResultado>(url);
    }
}
