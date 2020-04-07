import { UsuarioService } from "src/app/services/usuarios/usuarios.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Componentes
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./paginas/home/home.component";
import { HeaderComponent } from "./paginas/templates/header/header.component";
import { FooterComponent } from "./paginas/templates/footer/footer.component";
import { AboutComponent } from "./paginas/about/about.component";
import { SegmentationDatabaseComponent } from "./paginas/segmentation-database/segmentation-database.component";
import { ClassificationDatabaseComponent } from "./paginas/classification-database/classification-database.component";
import { DownloadsComponent } from "./paginas/downloads/downloads.component";
import { IndexComponent } from "./paginas/index/index.component";
import { ListarCardsImagemComponent } from "./components/imagem/listar-cards-imagem/listar-cards-imagem.component";
import { PaginaDeErroComponent } from "./paginas/pagina_de_erro/pagina-de-erro.component";
import { SegmentarImagemComponent } from "./paginas/segmentar-imagem/segmentar-imagem.component";
import { ClassificarImagemComponent } from "./paginas/classificar-imagem/classificar-imagem.component";
import { UsuarioComponent } from "./paginas/usuario/usuario.component";
import { LoginComponent } from "./components/login/login.component";
import { GuardaAutenticacao } from "./guardas/guarda-autenticacao";
import { CadastroVisitanteComponent } from "./components/usuario/cadastro-visitante/cadastro-visitante.component";
import { CadastrarImagemComponent } from "./components/imagem/cadastrar-imagem/cadastrar-imagem.component";
import { TesteComponent } from "./paginas/teste/teste.component";
import { ChartModule } from "angular-highcharts";

// Services
import { AutenticacaoService } from "./services/login/autenticacao.service";
import { ImagemService } from "./services/imagens_service/imagens.service";
import { ConexaoService } from "./services/conexao/conexao.service";
import { AnimacaoCarregamentoComponent } from "./components/sistema/animacao-carregamento/animacao-carregamento.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        AboutComponent,
        SegmentationDatabaseComponent,
        ClassificationDatabaseComponent,
        DownloadsComponent,
        IndexComponent,
        ListarCardsImagemComponent,
        PaginaDeErroComponent,
        SegmentarImagemComponent,
        ClassificarImagemComponent,
        UsuarioComponent,
        LoginComponent,
        CadastroVisitanteComponent,
        CadastrarImagemComponent,
        TesteComponent,
        AnimacaoCarregamentoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ChartModule
    ],
    providers: [
        ImagemService,
        UsuarioService,
        AutenticacaoService,
        GuardaAutenticacao,
        ConexaoService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
