import { Component, OnInit, OnDestroy } from "@angular/core";
import { ImagemService } from "src/app/services/imagens_service/imagens.service";
import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";
import { Subscription } from "rxjs";
import { saveAs } from "file-saver";
import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { Mensagens } from "src/app/utils/mensagens";

@Component({
    selector: "cr-downloads",
    templateUrl: "./downloads.component.html",
    styleUrls: ["./downloads.component.scss"]
})
export class DownloadsComponent implements OnInit, OnDestroy {

    private armazenamentoBrowser: ArmazenamentoBrowser;
    private objetoSessao: IObjetoSessaoModel;
    private objetoErro: ObjetoErro;
    private fazerDownloadImagensBaseSubscription: Subscription;
    public carregando = false;

    constructor(private imagemServico: ImagemService) {
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoErro = new ObjetoErro();
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
    }

    ngOnInit() { }

    ngOnDestroy() {
        if (this.fazerDownloadImagensBaseSubscription) { this.fazerDownloadImagensBaseSubscription.unsubscribe(); }
    }

    solicitarDownloadImagens() {

        this.carregando = true;
        let user_id = "1";
        if(this.objetoSessao) {
                user_id = this.objetoSessao.id_usuario.toString();
            }

        this.fazerDownloadImagensBaseSubscription =
                this.imagemServico.fazerDownloadImagensBaseInterna(user_id)
                    .subscribe(
                        (retorno) => {
                            saveAs(retorno, "base.zip");
                            this.carregando = false;
                        },
                        (erro) => {

                            this.carregando = false;
                            /*O erro volta como blob, pois o tipo de responsetType é blob, acredito que deve-se converter o lob p json, para tratar o erro */

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
}
