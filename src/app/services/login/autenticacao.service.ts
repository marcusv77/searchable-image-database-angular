import { Injectable, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { UsuarioService } from "../usuarios/usuarios.service";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { UsuarioAutenticacaoModelRequisicao } from "src/app/models/autenticacao/usuario_autenticacao.model";
import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";


@Injectable({
    providedIn: "root"
})

export class AutenticacaoService implements OnInit, OnDestroy {

    private usuarioBanco: UsuarioAutenticacaoModelRequisicao;
    private usuarioAutenticado = false;
    public usuarioLogadoEventEmitter = new EventEmitter<boolean>();
    private armazenamentoBrowser: ArmazenamentoBrowser;

    constructor(private router: Router, private usuarioService: UsuarioService) {
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
    }

    ngOnInit() { }

    ngOnDestroy() { }

    autenticarUsuario(
        dadosLogin: any = null
    ): Observable<any> {
        return this.usuarioService.obterUsuarioCompletoParaLogin(
            dadosLogin
        )
            .pipe(
                map(
                    (retorno) => {
                        this.usuarioBanco = retorno;
                        this.usuarioAutenticado = true;
                        this.usuarioLogadoEventEmitter.emit(true);

                        const usuarioLogado = {
                            id_usuario: this.usuarioBanco.usuario.id,
                            email: this.usuarioBanco.usuario.email,
                            Authorization: this.usuarioBanco.Authorization
                        };

                        this.armazenamentoBrowser.armazenarDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO, usuarioLogado);
                        this.router.navigate([""]);

                        return true;
                    }
                )
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
}
