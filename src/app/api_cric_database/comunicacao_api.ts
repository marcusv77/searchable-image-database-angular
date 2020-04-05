import { environment } from '../../environments/environment';

export class ComunicacaoApi {

    private UrlBaseApi: string;
    private UrlCaminhoBaseInterna: string;
    private UrlCaminhoBaseExterna: string;
    private UrlCaminhoBaseThumbnail: string;
    private TokenCuringa: string;
    private ambienteProducao: boolean;

    public constructor () {
        this.UrlBaseApi = environment.api_url;
        this.UrlCaminhoBaseInterna = 'imagens/base_interna';
        this.UrlCaminhoBaseExterna = 'imagens/base_externa';
        this.UrlCaminhoBaseThumbnail = 'imagens/base_thumbnail';
        this.TokenCuringa = 'bac8db9147ac80b4ba8a05bb0de7c4fd';
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

    public obterTokenCuringa(): string {
        return this.TokenCuringa;
    }
}
