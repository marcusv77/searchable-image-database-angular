import { environment } from '../../environments/environment';

// Contem a url_base para o servidor da api
const BASE_URL_API = 'http://localhost:3000';
const BASE_URL_API_PRODUCAO = 'http://projetosfagner.com.br';

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
        this.ambienteProducao = false;
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
