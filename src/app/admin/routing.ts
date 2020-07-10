import { Routes } from "@angular/router";

import { GuardaAutenticacao } from "../guardas/guarda-autenticacao";

import { AdminHomeComponent } from './home/admin-home.component';
import { AdminUserComponent } from './user/admin-user.component';

const admin_routes: Routes = [
    {path: "admin", component: AdminHomeComponent, canActivate: [GuardaAutenticacao]},
    {path: "admin/user", component: AdminUserComponent, canActivate: [GuardaAutenticacao]},
];


export default admin_routes;
