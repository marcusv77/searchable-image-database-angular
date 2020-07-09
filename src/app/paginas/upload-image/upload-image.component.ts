import { Component, OnInit, OnDestroy } from "@angular/core";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";
import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { ImagemService } from "src/app/services/imagens_service/imagens.service";
import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { Subscription } from "rxjs";
import { IImagemModelResultado } from "src/app/models/imagem/imagem.model";
import { ComunicacaoApi } from "../../api_cric_database/comunicacao_api";

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

    constructor(private imagemService: ImagemService, private formBuilder: FormBuilder) {
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

                            const destino = this.new_image.fonte_aquisicao == 1 ? this.comunicacaoApi.obterUrlBaseInterna() : this.comunicacaoApi.obterUrlBaseExterna();
                            this.new_image_path = `${this.comunicacaoApi.obterUrlBaseApi()}/${destino}/${this.new_image.nome}`;

                            this.new_image_uploaded = true;
                        },
                        (erro) => {
                            this.objetoErro = erro.error;
                            switch (this.objetoErro.status_code) {

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

}
