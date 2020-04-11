import { Injectable, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuarios.service';
import { HttpStatusCode } from '../../utils/tratamento_erro/Http_Status_Code';
import { ChavesArmazenamentoBrowser } from '../../utils/chaves_armazenamento_browser';
import { UsuarioAutenticacaoModelRequisicao } from 'src/app/models/autenticacao/usuario_autenticacao.model';
import { ArmazenamentoBrowser } from 'src/app/utils/browser_storage/browser_storage';
import { ObjetoErro } from 'src/app/utils/tratamento_erro/ObjetoErro';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AutenticacaoService implements OnInit, OnDestroy {

    //#region Propriedades
    private usuarioBanco: UsuarioAutenticacaoModelRequisicao;
    private usuarioAutenticado: boolean = false;
    public usuarioLogadoEventEmitter = new EventEmitter<boolean>();
    private armazenamentoBrowser: ArmazenamentoBrowser;
    private objetoErro: ObjetoErro;
    private autenticarUsuarioSubscription: Subscription;
    //#endregion

    //#region Construtor
    constructor(private router: Router, private usuarioService: UsuarioService)
    {
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoErro = new ObjetoErro();
    }
    //#endregion

    ngOnInit() { }

    ngOnDestroy() {
        if(this.autenticarUsuarioSubscription) {this.autenticarUsuarioSubscription.unsubscribe()}
    }

    //#region Metodos
    autenticarUsuario(id_usuario: number = 0, dadosLogin: any = null)
    {
        this.autenticarUsuarioSubscription =
        this.usuarioService.obterUsuarioCompletoParaLogin(id_usuario, dadosLogin)
        .subscribe(
            (retorno) => {
                this.usuarioBanco = retorno;
                this.usuarioAutenticado = true;
                this.usuarioLogadoEventEmitter.emit(true);

                let usuarioLogado = {
                    id_usuario: this.usuarioBanco.usuario.id,
                    email: this.usuarioBanco.usuario.email,
                    token_autenticacao: this.usuarioBanco.token_autenticacao
                }

                this.armazenamentoBrowser.armazenarDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO, usuarioLogado);
                this.router.navigate(['/home']);
            },
            (erro) => {
                this.objetoErro = erro.error;
                this.usuarioAutenticado = false;
                this.usuarioLogadoEventEmitter.emit(false);
                this.router.navigate(['']);

                switch(this.objetoErro.status_code) {

                    case HttpStatusCode.UNAUTHORIZED: {
                        alert(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.NOT_FOUND: {
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

    usuarioEstaAutenticado(): boolean {
        return this.usuarioAutenticado;
    }

    setUsuarioAutenticado(valor: boolean) {
        this.usuarioAutenticado = valor;
    }

    solicitarLogOff() {
        this.usuarioAutenticado = false;
    }
    //#endregion
}
