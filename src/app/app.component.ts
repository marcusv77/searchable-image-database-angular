import { Component, Output } from "@angular/core";

import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";

import { AutenticacaoService } from "src/app/services/login/autenticacao.service";

import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";

@Component({
    selector: "cr-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "name": "CRIC Searchable Image Database",
        "url": "http://database.cric.com.br/"
    };

    @Output() usuarioAutenticado: boolean;
    @Output() objetoSessao: IObjetoSessaoModel;
    private armazenamentoBrowser: ArmazenamentoBrowser;

    // Construtor
    constructor(private autenticacaoService: AutenticacaoService) {
        this.usuarioAutenticado = false;
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
    }

    // Metodo de inicializacao
    ngOnInit() {
        // Autenticar no refresh da pagina
        if(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO)) {
            this.autenticacaoService.setUsuarioAutenticado(true);
            this.usuarioAutenticado = true;
            this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
            this.autenticacaoService.usuarioLogadoEventEmitter.emit(true);
        }

        // Autenticar no login
        this.autenticacaoService.usuarioLogadoEventEmitter
            .subscribe(
                (autenticado: boolean) => {
                    this.usuarioAutenticado = autenticado;
                    this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
                }
            );
    }
}
