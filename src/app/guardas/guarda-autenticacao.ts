import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AutenticacaoService } from "../services/login/autenticacao.service";

@Injectable({
    providedIn: "root"
})
export class GuardaAutenticacao implements CanActivate {

    constructor(
        private autenticacaoService: AutenticacaoService,
        private router: Router
    ) { }

    canActivate(rota: ActivatedRouteSnapshot, estado: RouterStateSnapshot): Observable<boolean> | boolean {

        if (this.autenticacaoService.usuarioEstaAutenticado()) {
            return true;
        }

        this.router.navigate([""]);

        return false;
    }
}
