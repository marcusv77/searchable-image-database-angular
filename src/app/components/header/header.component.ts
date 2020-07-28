import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";

import { AutenticacaoService } from "src/app/services/login/autenticacao.service";
import { UsuarioService } from "src/app/services/usuarios/usuarios.service";

import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";

@Component({
    selector: "cr-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Input() objetoSessao: IObjetoSessaoModel;
    @Input() usuarioAutenticado: boolean;
    private armazenamentoBrowser: ArmazenamentoBrowser;
    private fazerLogOutSubscription: Subscription;
    private objetoErro: ObjetoErro;
    public exibir_botao_dropdown_menu = "nao_exibir_botao_menu";

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "name": "angular.io",
        "url": "https://angular.io"
    };

    constructor(private autenticacaoService: AutenticacaoService, private router: Router, private usuarioService: UsuarioService) {
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if(this.fazerLogOutSubscription) {
            this.fazerLogOutSubscription.unsubscribe();
        }
    }

    fazerLogOut($event) {
        $event.preventDefault();

        this.fazerLogOutSubscription =
        this.usuarioService.fazerLogOff()
            .subscribe(
                (retorno) => {
                    this.autenticacaoService.solicitarLogOff();
                    this.autenticacaoService.usuarioLogadoEventEmitter.emit(false);
                    this.armazenamentoBrowser.excluirDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO);
                    this.router.navigate([""]);
                },
                (erro) => {

                    this.objetoErro = erro.error;
                    switch(this.objetoErro.status_code) {

                    case HttpStatusCode.UNAUTHORIZED:
                    case HttpStatusCode.BAD_REQUEST:
                    case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    default: {
                        console.log(erro);
                        break;
                    }
                    }
                }
            );
    }

}
