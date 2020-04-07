import { Component, OnInit } from "@angular/core";
import { AutenticacaoService } from "src/app/services/login/autenticacao.service";
import { UsuarioLogin } from "src/app/services/login/usuario_login";

@Component({
    selector: "cr-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    //#region Propriedades
    public usuarioLogin: UsuarioLogin;
    private idLoginPadrao: number;
    //#endregion

    constructor(private autenticacaoService: AutenticacaoService){
        this.usuarioLogin = new UsuarioLogin();
    }

    ngOnInit() {
        this.idLoginPadrao = 0;
    }

    fazerLogin() {
        this.autenticacaoService.autenticarUsuario(this.idLoginPadrao, this.usuarioLogin);
    }

}
