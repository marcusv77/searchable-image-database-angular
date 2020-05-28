import { Injectable, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs";

import { UsuarioService } from "../usuarios/usuarios.service";


@Injectable({
    providedIn: "root"
})

export class SignUpService implements OnInit, OnDestroy {

    constructor(private usuarioService: UsuarioService) { }

    ngOnInit() { }

    ngOnDestroy() { }

    sign_up(
        data: any = null
    ): Observable<any> {
        return this.usuarioService.sign_up(
            data
        );
    }
}
