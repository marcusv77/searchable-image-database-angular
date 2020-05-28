import { Component, OnInit, ViewChild } from "@angular/core";
import { AutenticacaoService } from "src/app/services/login/autenticacao.service";
import { UsuarioService } from "src/app/services/usuarios/usuarios.service";
import { UsuarioLogin } from "src/app/services/login/usuario_login";
import { SignUpService } from "src/app/services/login/sign_up.service";
import { SignUp } from "src/app/services/login/sign_up";

@Component({
    selector: "cr-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    @ViewChild("login_close", { static: true }) login_close: any;
    public usuarioLogin: UsuarioLogin;
    public new_user: SignUp;
    public is_invalid: boolean;
    public reset_password_view: boolean;
    public reset_password_complete: boolean;
    public sign_up_view: boolean;

    constructor(
        private autenticacaoService: AutenticacaoService,
        private usuarioService: UsuarioService,
        private signUpService: SignUpService
    ){
        this.usuarioLogin = new UsuarioLogin();
        this.new_user = new SignUp();
    }

    ngOnInit() {
        this.is_invalid = false;
        this.reset_password_view = false;
        this.reset_password_complete = false;
        this.sign_up_view = false;
    }

    sign_in() {
        this.autenticacaoService.autenticarUsuario(
            this.usuarioLogin
        )
            .subscribe(
                () => {
                    this.is_invalid = false;
                    this.login_close.nativeElement.click();
                },
                (err) => {
                    this.is_invalid = true;
                    console.log(err);
                }
            );
    }

    ask2reset_password() {
        this.reset_password_view = true;
    }

    reset_password() {
        this.reset_password_view = false;

        this.usuarioService.reset_password({
            email: this.usuarioLogin.email
        })
            .subscribe(
                () => {
                    this.reset_password_complete = true;
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    ask2sign_up() {
        this.sign_up_view = true;
    }

    sign_up() {
        this.signUpService.sign_up(
            this.new_user
        )
            .subscribe(
                () => {
                    this.is_invalid = false;

                    this.usuarioLogin.email = this.new_user.email;
                    this.usuarioLogin.senha = this.new_user.senha;
                    this.sign_in();
                },
                (err) => {
                    this.is_invalid = true;
                    console.log(err);
                }
            );
    }

}
