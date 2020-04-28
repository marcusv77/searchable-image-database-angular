import { environment } from "../../environments/environment";

export class ComunicacaoApi {

    private UrlBaseApi: string;
    private UrlCaminhoBaseInterna: string;
    private UrlCaminhoBaseExterna: string;
    private UrlCaminhoBaseThumbnail: string;

    public constructor () {
        this.UrlBaseApi = environment.api_url;
        this.UrlCaminhoBaseInterna = "imagens/base_interna";
        this.UrlCaminhoBaseExterna = "imagens/base_externa";
        this.UrlCaminhoBaseThumbnail = "imagens/base_thumbnail";
    }

    public obterUrlBaseApi(): string {
        return this.UrlBaseApi;
    }

    public obterUrlBaseInterna(): string {
        return this.UrlCaminhoBaseInterna;
    }

    public obterUrlBaseExterna(): string {
        return this.UrlCaminhoBaseExterna;
    }

    public obterUrlBaseThumbnail(): string {
        return this.UrlCaminhoBaseThumbnail;
    }

}
