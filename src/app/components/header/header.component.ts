import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { AutenticacaoService } from "src/app/services/login/autenticacao.service";
import { Router } from "@angular/router";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";
import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { UsuarioService } from "src/app/services/usuarios/usuarios.service";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";
import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { Subscription } from "rxjs";

@Component({
    selector: "cr-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Input() usuarioAutenticado = false;
    private armazenamentoBrowser: ArmazenamentoBrowser;
    private objetoSessao: IObjetoSessaoModel;
    public exibir_botao_dropdown_menu = "nao_exibir_botao_menu";
    private objetoErro: ObjetoErro;
    private fazerLogOutSubscription: Subscription;

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "name": "angular.io",
        "url": "https://angular.io"
    };

    constructor(private autenticacaoService: AutenticacaoService, private router: Router, private usuarioService: UsuarioService) {
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
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
        this.autenticacaoService.solicitarLogOff();
        this.autenticacaoService.usuarioLogadoEventEmitter.emit(false);
        this.armazenamentoBrowser.excluirDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO);
        this.router.navigate([""]);

        this.fazerLogOutSubscription =
        this.usuarioService.fazerLogOff(this.objetoSessao.Authorization)
            .subscribe(
                (retorno) => {
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
