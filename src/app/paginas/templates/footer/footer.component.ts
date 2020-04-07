import { Component, OnInit } from "@angular/core";
import { LinksExternos } from "src/app/utils/links_externos";

@Component({
    selector: "cr-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {

    public linkUFOP: string;
    public linkUFOC: string;
    public linkUC_BERKELEY: string;

    constructor() {
        this.linkUFOP = LinksExternos.UFOP;
        this.linkUFOC = LinksExternos.UFC;
        this.linkUC_BERKELEY = LinksExternos.UC_BERKELEY;
    }

    ngOnInit() { }

}
