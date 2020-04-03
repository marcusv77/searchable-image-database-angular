import { Component, OnInit, Output } from '@angular/core';
import { IUsuarioBaseModel } from "../../models/usuario/usuario_base.model";
import { UsuarioService } from "../../services/usuarios/usuarios.service";
import { ObjetoErro } from 'src/app/utils/tratamento_erro/ObjetoErro';
import { HttpStatusCode } from 'src/app/utils/tratamento_erro/Http_Status_Code';

@Component({
    selector: 'cr-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {

    @Output() public todosUsuarios: IUsuarioBaseModel[];
    private objetoErro: ObjetoErro;
    public carregando: boolean;

    constructor(private usuarioService: UsuarioService) {
    }

    // Inicialzia o componente e busca todas as imagens do "banco de dados"
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

                switch(this.objetoErro.status_code) {

                    case HttpStatusCode.UNAUTHORIZED: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.NOT_FOUND: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

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
