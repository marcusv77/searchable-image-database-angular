import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarios/usuarios.service';
import { ObjetoErro } from 'src/app/utils/tratamento_erro/ObjetoErro';
import { HttpStatusCode } from 'src/app/utils/tratamento_erro/Http_Status_Code';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AutenticacaoService } from 'src/app/services/login/autenticacao.service';
import { UsuarioLogin } from 'src/app/services/login/usuario_login';
import { Subscription } from 'rxjs';

@Component({
    selector: 'cr-cadastro-visitante',
    templateUrl: './cadastro-visitante.component.html',
    styleUrls: ['./cadastro-visitante.component.scss']
})
export class CadastroVisitanteComponent implements OnInit, OnDestroy {

    //#region Propriedades
    private objetoErro: ObjetoErro;
    private formularioVisitante: FormGroup;
    private usuarioLogin: UsuarioLogin;
    private idLoginPadrao: number;
    private solicitarCadastroVisitanteSubscription: Subscription;
    private cadastrarAnalistaSubscription: Subscription;
    //#endregion

    //#region Construtor
    constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService) {

        this.idLoginPadrao = 0;
        this.usuarioLogin = new UsuarioLogin();

        this.formularioVisitante = this.formBuilder.group({
            primeiro_nome: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30),
                    Validators.pattern('^[a-zA-ZÀ-ú ]*'),
                    this.validarEspacosEmBranco
                ])
            ],
            ultimo_nome: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30),
                    Validators.pattern('^[a-zA-ZÀ-ú ]*')
                ])
            ],
            email: [
                '', Validators.compose([
                    Validators.required,
                    Validators.email
                ])
            ],
            senha: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(25)
                ])
            ],
            pais: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(70),
                    Validators.pattern('^[a-zA-ZÀ-ú ]*')
                ])
            ],
            estado_regiao: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(70),
                    Validators.pattern('^[a-zA-ZÀ-ú ]*')
                ])
            ],
            cidade: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(70),
                    Validators.pattern('^[a-zA-ZÀ-ú ]*')
                ])
            ]
        });
    }
    //#endregion


    //#region Inicializacao
    ngOnInit() { }

    ngOnDestroy() {
        if (this.solicitarCadastroVisitanteSubscription) { this.solicitarCadastroVisitanteSubscription.unsubscribe() }
        if (this.cadastrarAnalistaSubscription) { this.cadastrarAnalistaSubscription.unsubscribe() }
    }
    //#endregion

    //#region Métodos
    solicitarCadastroVisitante() {

        this.solicitarCadastroVisitanteSubscription =
        this.usuarioService.cadastrarVisitante(this.formularioVisitante.value)
        .subscribe(
            (retorno) => {
                this.usuarioLogin.email = this.formularioVisitante.value.email;
                this.usuarioLogin.senha = this.formularioVisitante.value.senha;
                this.formularioVisitante.reset();
                this.solicitarCadastroAnalista(retorno.id);
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

                    case HttpStatusCode.CONFLICT: {
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

    solicitarCadastroAnalista(id_analista: number) {

        this.cadastrarAnalistaSubscription =
        this.usuarioService.cadastrarAnalista(id_analista)
        .subscribe(
            (retorno) => {
                this.autenticacaoService.autenticarUsuario(this.idLoginPadrao, this.usuarioLogin);
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

                    case HttpStatusCode.CONFLICT: {
                        alert(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.NOT_FOUND: {
                        alert(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.FORBIDDEN: {
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

    // Propriedades do formulário que vamos utilizar para obter os erros
    get primeiro_nome() {
        return this.formularioVisitante.get('primeiro_nome');
    }

    get ultimo_nome() {
        return this.formularioVisitante.get('ultimo_nome');
    }

    get email() {
        return this.formularioVisitante.get('email');
    }

    get senha() {
        return this.formularioVisitante.get('senha');
    }

    get pais() {
        return this.formularioVisitante.get('pais');
    }

    get estado_regiao() {
        return this.formularioVisitante.get('estado_regiao');
    }

    get cidade() {
        return this.formularioVisitante.get('cidade');
    }

    validarEspacosEmBranco(input: FormControl) {
        let regexp = new RegExp(/^[ \\t]+$/);
        let test = regexp.test(input.value);
        return test ? { branco: true } : null
    }
    //#endregion
}
