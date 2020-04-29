import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GuardaAutenticacao } from "./guardas/guarda-autenticacao";

import { AboutComponent } from "./paginas/about/about.component";
import { SegmentationDatabaseComponent } from "./paginas/segmentation-database/segmentation-database.component";
import { ClassificationDatabaseComponent } from "./paginas/classification-database/classification-database.component";
import { DownloadsComponent } from "./paginas/downloads/downloads.component";
import { IndexComponent } from "./paginas/index/index.component";
import { PaginaDeErroComponent } from "./paginas/pagina_de_erro/pagina-de-erro.component";
import { SegmentarImagemComponent } from "./paginas/segmentar-imagem/segmentar-imagem.component";
import { ListarCardsImagemComponent } from "./components/imagem/listar-cards-imagem/listar-cards-imagem.component";
import { ClassificarImagemComponent } from "./paginas/classificar-imagem/classificar-imagem.component";
import { UsuarioComponent } from "./paginas/usuario/usuario.component";
import { LicenseComponent } from "./paginas/license/license.component";
import { PrivacyComponent } from "./paginas/privacy/privacy.component";
import { TermsComponent } from "./paginas/terms/terms.component";

const routes: Routes = [
    {path: "", component: IndexComponent},
    {path: "license", component: LicenseComponent},
    {path: "privacy", component: PrivacyComponent},
    {path: "terms", component: TermsComponent},
    {path: "about", component: AboutComponent},
    {path: "segmentation", component: SegmentationDatabaseComponent},
    {path: "classification", component: ClassificationDatabaseComponent},
    {path: "downloads", component: DownloadsComponent},
    {path: "image", component: ListarCardsImagemComponent},
    {path: "erro", component: PaginaDeErroComponent},
    {path: "segmentation/image/:id", component: SegmentarImagemComponent},
    {path: "classification/image/:id", component: ClassificarImagemComponent},
    {path: "user", component: UsuarioComponent, canActivate: [GuardaAutenticacao]},
    {path: "**", component: PaginaDeErroComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {anchorScrolling:"enabled"})],
    exports: [RouterModule]
})

export class AppRoutingModule { }
