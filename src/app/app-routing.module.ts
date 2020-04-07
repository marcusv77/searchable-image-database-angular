/*Componentes do sistema*/
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/*Paginas */
import { HomeComponent } from "./paginas/home/home.component";
import { AboutComponent } from "./paginas/about/about.component";
import { SegmentationDatabaseComponent } from "./paginas/segmentation-database/segmentation-database.component";
import { ClassificationDatabaseComponent } from "./paginas/classification-database/classification-database.component";
import { DownloadsComponent } from "./paginas/downloads/downloads.component";
import { PublicationsComponent } from "./paginas/publications/publications.component";
import { IndexComponent } from "./paginas/index/index.component";
import { PaginaDeErroComponent } from "./paginas/pagina_de_erro/pagina-de-erro.component";
import { SegmentarImagemComponent } from "./paginas/segmentar-imagem/segmentar-imagem.component";

/*Componentes de Paginas - Eliminar estas rotas após testá-las.*/
import { ListarCardsImagemComponent } from "./components/imagem/listar-cards-imagem/listar-cards-imagem.component";
import { ClassificarImagemComponent } from "./paginas/classificar-imagem/classificar-imagem.component";
import { UsuarioComponent } from "./paginas/usuario/usuario.component";
import { GuardaAutenticacao } from "./guardas/guarda-autenticacao";
import { TesteComponent } from "./paginas/teste/teste.component";

/*Rotas do sistema */
const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "home", component: HomeComponent, canActivate: [GuardaAutenticacao]},
  {path: "about", component: AboutComponent, canActivate: [GuardaAutenticacao]},
  {path: "segmentation_database", component: SegmentationDatabaseComponent, canActivate: [GuardaAutenticacao]},
  {path: "classification_database", component: ClassificationDatabaseComponent, canActivate: [GuardaAutenticacao]},
  {path: "downloads", component: DownloadsComponent, canActivate: [GuardaAutenticacao]},
  {path: "publications", component: PublicationsComponent, canActivate: [GuardaAutenticacao]},
  {path: "lista_de_imagens", component: ListarCardsImagemComponent, canActivate: [GuardaAutenticacao]},
  {path: "erro", component: PaginaDeErroComponent},
  {path: "segmentation_database/segment_imagem/:id", component: SegmentarImagemComponent, canActivate: [GuardaAutenticacao]},
  {path: "classification_database/classify_image/:id", component: ClassificarImagemComponent, canActivate: [GuardaAutenticacao]},
  {path: "usuarios", component: UsuarioComponent, canActivate: [GuardaAutenticacao]},
  {path: "teste", component: TesteComponent},
  {path: "**", component :PaginaDeErroComponent, canActivate: [GuardaAutenticacao]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling:"enabled"})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
