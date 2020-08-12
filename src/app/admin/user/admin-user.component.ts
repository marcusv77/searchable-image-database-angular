import { Component, OnInit, Output } from "@angular/core";

import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";

import { IUsuarioBaseModel } from "src/app/models/usuario/usuario_base.model";

import { UsuarioService } from "../../services/usuarios/usuarios.service";

@Component({
  selector: 'cr-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

    public todosUsuarios: IUsuarioBaseModel[];
    private objetoErro: ObjetoErro;
    public carregando: boolean;

    constructor(private usuarioService: UsuarioService) {
    }

    ngOnInit() {
        this.carregando = false;
        this.objetoErro = new ObjetoErro();
        this.listarTodosUsuarios();
    }

    listarTodosUsuarios() {
        this.carregando = true;
        this.usuarioService.obterTodosUsuarios()
            .subscribe(
                (todosUsuarios) => {
                    this.todosUsuarios = todosUsuarios;
                    this.carregando = false;
                },
                (erro) => {
                    this.carregando = false;
                    this.objetoErro = erro.error;

                    switch(this.objetoErro.status) {

                    case HttpStatusCode.UNAUTHORIZED:
                    case HttpStatusCode.NOT_FOUND:
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
