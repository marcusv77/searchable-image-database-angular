import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

import { environment } from "src/environments/environment";

import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";

import { IStatusSistemaResultado } from "src/app/models/sistema/status_sistema.model";

import { ConexaoService } from "src/app/services/conexao/conexao.service";

@Component({
    selector: "cr-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"]
})

export class IndexComponent implements OnInit, OnDestroy {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "CRIC Searchable Image Database Home Page",
        "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    public statusDaConexao: IStatusSistemaResultado;
    private objetoErro: ObjetoErro;
    private verificarConexaoSubscription: Subscription;
    public carregando: boolean;
    public playground: boolean;

    constructor(private conexaoService: ConexaoService) {
        this.playground = environment.playground === "true";
    }

    ngOnInit() { }

    ngOnDestroy() {
        if(this.verificarConexaoSubscription) {
            this.verificarConexaoSubscription.unsubscribe();
        }
    }
}
