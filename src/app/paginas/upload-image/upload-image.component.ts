import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { environment } from "src/environments/environment";

import { IImagemModelResultado } from "src/app/models/imagem/imagem.model";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";

import { ImagemService } from "src/app/services/imagens.service";

import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";

import { ComunicacaoApi } from "src/app/api_cric_database/comunicacao_api";

@Component({
    selector: "cr-upload-image",
    templateUrl: "./upload-image.component.html",
    styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit, OnDestroy {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Upload Image",
        "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    private objetoErro: ObjetoErro;
    private objetoSessao: IObjetoSessaoModel;
    private armazenamentoBrowser: ArmazenamentoBrowser;
    public formularioImagem: FormGroup;
    public carregando: boolean;
    public arquivoSelecionado: boolean;
    public new_image_uploaded: boolean;
    public new_image: IImagemModelResultado;
    public new_image_path: string;
    private solicitarCadastroImagemSubscription: Subscription;
    private comunicacaoApi: ComunicacaoApi;
    public playground: boolean;

    constructor(private router: Router, private imagemService: ImagemService, private formBuilder: FormBuilder) {
        this.playground = environment.playground === "true";
        this.comunicacaoApi = new ComunicacaoApi();
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
        this.objetoErro = new ObjetoErro();
        this.carregando = false;
        this.arquivoSelecionado = false;
        this.new_image_uploaded = false;

        this.formularioImagem = this.formBuilder.group({
            codigo_lamina:
                [
                    "",
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(60)
                    ])
                ],
            dt_aquisicao:
                [
                    "",
                    Validators.compose([
                        Validators.required
                    ])
                ],
            arquivo_imagem: [null]
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.solicitarCadastroImagemSubscription) {
            this.solicitarCadastroImagemSubscription.unsubscribe();
        }
    }

    solicitarCadastroImagem() {

        if (this.formularioImagem.valid) {
            this.carregando = true;
            const formularioFormData: FormData = new FormData();
            formularioFormData.append("id_usuario", this.objetoSessao.id_usuario.toString());
            formularioFormData.append("codigo_lamina", this.formularioImagem.get("codigo_lamina").value);
            formularioFormData.append("dt_aquisicao", this.formularioImagem.get("dt_aquisicao").value);
            formularioFormData.append("file", this.formularioImagem.get("arquivo_imagem").value);

            this.solicitarCadastroImagemSubscription =
                this.imagemService.cadastrarImagem(formularioFormData)
                    .subscribe(
                        (retorno) => {
                            this.carregando = false;

                            this.new_image = retorno;

                            this.new_image_path = `${this.comunicacaoApi.getImageURL()}/${this.new_image.nome}`;

                            this.new_image_uploaded = true;
                        },
                        (erro) => {
                            this.objetoErro = erro.error;
                            switch (this.objetoErro.status) {

                            case HttpStatusCode.UNAUTHORIZED: {
                                console.log(this.objetoErro.mensagem);
                                break;
                            }

                            case HttpStatusCode.BAD_REQUEST: {
                                console.log(this.objetoErro.mensagem);
                                break;
                            }

                            case HttpStatusCode.NOT_FOUND: {
                                console.log(this.objetoErro.mensagem);
                                break;
                            }

                            case HttpStatusCode.FORBIDDEN: {
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
        else {
            console.log("Could not retrieve informations from form. Plase, try again.");
        }
    }

    tratarUpload(event: any) {
        const arquivo = (event.target as HTMLInputElement).files[0];
        this.formularioImagem.patchValue({
            arquivo_imagem: arquivo
        });
        this.formularioImagem.get("arquivo_imagem").updateValueAndValidity();
        this.arquivoSelecionado = true;
    }

    get codigo_lamina() {
        return this.formularioImagem.get("codigo_lamina");
    }

    get dt_aquisicao() {
        return this.formularioImagem.get("dt_aquisicao");
    }

    new_upload(event) {
        if (event.view.getSelection().type !== "Range") {
            event.preventDefault();

            this.arquivoSelecionado = false;
            this.new_image_uploaded = false;
            this.formularioImagem.reset();
            window.location.hash="#upload-new-image";
        }
    }

    go2segmentation(event) {
        if (event.view.getSelection().type !== "Range") {
            event.preventDefault();

            this.router.navigate(
                [
                    this.segmentation_url()
                ]
            ).then(
                ()=>{
                    window.location.hash="#dashboard";
                }
            );
        }
    }

    segmentation_url() {
        return `segmentation/image/${this.new_image.id}`;
    }


    go2classification(event) {
        if (event.view.getSelection().type !== "Range") {
            event.preventDefault();

            this.router.navigate(
                [
                    this.classification_url()
                ]
            ).then(
                ()=>{
                    window.location.hash="#dashboard";
                }
            );
        }
    }

    classification_url() {
        return `classification/image/${this.new_image.id}`;
    }

}
