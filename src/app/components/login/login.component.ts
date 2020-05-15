import { Component, OnInit, ViewChild } from "@angular/core";
import { AutenticacaoService } from "src/app/services/login/autenticacao.service";
import { UsuarioService } from "src/app/services/usuarios/usuarios.service";
import { UsuarioLogin } from "src/app/services/login/usuario_login";

@Component({
    selector: "cr-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    @ViewChild("login_close", { static: true }) login_close: any;
    public usuarioLogin: UsuarioLogin;
    public is_invalid: boolean;
    public reset: boolean;
    public reset_complete: boolean;

    constructor(private autenticacaoService: AutenticacaoService, private usuarioService: UsuarioService){
        this.usuarioLogin = new UsuarioLogin();
    }

    ngOnInit() {
        this.is_invalid = false;
        this.reset = false;
    }

    fazerLogin() {
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
        this.reset = true;
    }

    reset_password() {
        this.reset = false;

        this.usuarioService.reset_password({
            email: this.usuarioLogin.email
        })
            .subscribe(
                () => {
                    this.reset_complete = true;
                },
                (err) => {
                    console.log(err);
                }
            );
    }

}
