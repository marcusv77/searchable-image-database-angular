import { Component, OnInit, ViewChild } from "@angular/core";
import { AutenticacaoService } from "src/app/services/login/autenticacao.service";
import { UsuarioLogin } from "src/app/services/login/usuario_login";

@Component({
    selector: "cr-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    @ViewChild("login_close", {}) login_close: any;
    public usuarioLogin: UsuarioLogin;
    public is_invalid: boolean;

    constructor(private autenticacaoService: AutenticacaoService){
        this.usuarioLogin = new UsuarioLogin();
    }

    ngOnInit() {
        this.is_invalid = false;
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

}
