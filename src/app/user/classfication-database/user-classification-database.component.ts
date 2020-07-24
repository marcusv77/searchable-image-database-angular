import { Component, OnInit, Output, OnDestroy, ViewChild } from "@angular/core";

import { Subscription } from "rxjs";

import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";

import { IImagemModelResultado } from "src/app/models/imagem/imagem.model";

import { ImagemService } from "src/app/services/imagens_service/imagens.service";

import { ComunicacaoApi } from "src/app/api_cric_database/comunicacao_api";

@Component({
  selector: 'cr-user-classification-database',
  templateUrl: './user-classification-database.component.html',
  styleUrls: ['./user-classification-database.component.scss']
})
export class UserClassificationDatabaseComponent implements OnInit {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "User",
        "license": "https://creativecommons.org/licenses/by/4.0/"
    };
    
    @Output() public todasImagens: IImagemModelResultado[];
    @Output() public classificationDatabase = false;
    private armazenamentoBrowser: ArmazenamentoBrowser;
    private comunicacaoApi: ComunicacaoApi;
    private listarImagensSubscription: Subscription;
    private objetoErro: ObjetoErro;
    public carregando: boolean;
    public objetoSessao: IObjetoSessaoModel;

    constructor(private imagemService: ImagemService) {
        this.objetoErro = new ObjetoErro();
        this.comunicacaoApi = new ComunicacaoApi();
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
        this.classificationDatabase = true;
        this.carregando = false;
    }

    // Inicialzia o componente e busca todas as imagens do "banco de dados"
    ngOnInit() {
        this.listarImagens();
    }

    ngOnDestroy() {
        if (this.listarImagensSubscription) {
            this.listarImagensSubscription.unsubscribe();
        }
    }

    listarImagens() {

        const user_id = this.objetoSessao.id_usuario;

        this.todasImagens = null;
        this.carregando = true;
        this.listarImagensSubscription =
        this.imagemService.listarTodasImagens(user_id)
            .subscribe(
                (retorno) => {
                    this.todasImagens = this.construirUrlCaminhoImagem(retorno);
                    this.carregando = false;
                },
                (erro) => {
                    this.carregando = false;
                    this.objetoErro = erro.error;

                    switch (this.objetoErro.status_code) {

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

    construirUrlCaminhoImagem(listaImagens: IImagemModelResultado[]) {

        listaImagens.forEach((imagem) => {
            const urlImg = `${this.comunicacaoApi.getThumbnailURL()}/${imagem.nome}`;
            imagem.caminho_imagem = urlImg;
        });

        return listaImagens;
    }
}
