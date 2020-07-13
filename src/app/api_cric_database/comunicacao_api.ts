import { environment } from "../../environments/environment";

export class ComunicacaoApi {

    private UrlBaseApi: string;
    private ImageURL: string;
    private ThumbnailURL: string;

    public constructor () {
        this.UrlBaseApi = environment.api_url;
        this.ImageURL = "imagens/png";
        this.ThumbnailURL = "imagens/thumbnail";
    }

    public obterUrlBaseApi(): string {
        return this.UrlBaseApi;
    }

    public getImageURL(): string {
        return `${this.UrlBaseApi}/${this.ImageURL}`;
    }

    public getThumbnailURL(): string {
        return `${this.UrlBaseApi}/${this.ThumbnailURL}`;
    }

}
