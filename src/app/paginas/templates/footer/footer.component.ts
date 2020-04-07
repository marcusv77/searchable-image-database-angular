import { Component, OnInit } from "@angular/core";
import { LinksExternos } from "src/app/utils/links_externos";

@Component({
    selector: "cr-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {

    public linkUfop: string;
    public linkDecom: string;
    public linkEscolafarmacia: string;
    public linkParceiroBerkeley: string;
    public linkFaceBook: string;

    constructor() {
        this.linkUfop = LinksExternos.UNIVERSIDADE_FEDERAL_OURO_PRETO;
        this.linkDecom = LinksExternos.DEPARTAMENTO_COMPUTACAO_UFOP;
        this.linkEscolafarmacia = LinksExternos.ESCOLA_FARMACIA_UFOP;
        this.linkParceiroBerkeley = LinksExternos.PARCEIRO_BERKELEY;
        this.linkFaceBook = LinksExternos.FACEBOOK;
    }

    ngOnInit() { }

}
