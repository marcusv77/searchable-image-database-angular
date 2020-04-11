import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChavesArmazenamentoBrowser } from 'src/app/utils/chaves_armazenamento_browser';
import { AutenticacaoService } from 'src/app/services/login/autenticacao.service';
import { Router } from '@angular/router';
import { IObjetoSessaoModel } from 'src/app/models/autenticacao/objeto_sessao.model';
import { ArmazenamentoBrowser } from 'src/app/utils/browser_storage/browser_storage';
import { UsuarioService } from 'src/app/services/usuarios/usuarios.service';
import { ObjetoErro } from 'src/app/utils/tratamento_erro/ObjetoErro';
import { HttpStatusCode } from 'src/app/utils/tratamento_erro/Http_Status_Code';
import { Subscription } from 'rxjs';

@Component({
    selector: 'cr-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Input() usuarioAutenticado: boolean = false;
    private armazenamentoBrowser: ArmazenamentoBrowser;
    private objetoSessao: IObjetoSessaoModel;
    public exibir_botao_dropdown_menu = 'nao_exibir_botao_menu';
    private objetoErro: ObjetoErro;
    private fazerLogOutSubscription: Subscription;

    constructor(private autenticacaoService: AutenticacaoService, private router: Router, private usuarioService: UsuarioService)
    {}

    ngOnInit() {
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
    }

    ngOnDestroy() {
        if(this.fazerLogOutSubscription) {this.fazerLogOutSubscription.unsubscribe()};
    }

    fazerLogOut($event)
    {
        $event.preventDefault();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
        this.autenticacaoService.solicitarLogOff();
        this.autenticacaoService.usuarioLogadoEventEmitter.emit(false);
        this.armazenamentoBrowser.excluirDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO);
        this.router.navigate(['']);

        this.fazerLogOutSubscription =
        this.usuarioService.fazerLogOff(this.objetoSessao.token_autenticacao)
        .subscribe(
            (retorno) => {
            },
            (erro) => {
                
                this.objetoErro = erro.error;
                switch(this.objetoErro.status_code) {

                    case HttpStatusCode.UNAUTHORIZED: {
                        alert(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.BAD_REQUEST: {
                        alert(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                        alert(this.objetoErro.mensagem);
                        break;
                    }

                    default: {
                        alert(erro);
                        break;
                    }
                }
            }
        );
    }

}
