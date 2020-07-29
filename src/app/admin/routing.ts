import { Routes } from "@angular/router";

import { GuardaAutenticacao } from "../guardas/guarda-autenticacao";

import { AdminHomeComponent } from './home/admin-home.component';
import { AdminUserComponent } from './user/admin-user.component';
import { AdminInjuryComponent } from './injury/admin-injury.component';

const admin_routes: Routes = [
    {path: "admin", component: AdminHomeComponent, canActivate: [GuardaAutenticacao]},
    {path: "admin/users", component: AdminUserComponent, canActivate: [GuardaAutenticacao]},
    {path: "admin/injuries", component: AdminInjuryComponent, canActivate: [GuardaAutenticacao]},
];


export default admin_routes;
