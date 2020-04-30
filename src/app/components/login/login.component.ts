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
    private idLoginPadrao: number;

    constructor(private autenticacaoService: AutenticacaoService){
        this.usuarioLogin = new UsuarioLogin();
    }

    ngOnInit() {
        this.idLoginPadrao = 0;
    }

    fazerLogin() {
        const is_authenticated = this.autenticacaoService.autenticarUsuario(this.idLoginPadrao, this.usuarioLogin);
        this.login_close.nativeElement.click();
    }

}
