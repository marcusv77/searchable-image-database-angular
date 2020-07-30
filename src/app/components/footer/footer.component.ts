import { Component, OnInit } from "@angular/core";

import { LinksExternos } from "src/app/utils/links_externos";
import { environment } from "src/environments/environment";

@Component({
    selector: "cr-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {

    public contact_us_email: string;
    public linkUFOP: string;
    public linkUFC: string;
    public linkUC_BERKELEY: string;

    constructor() {
        this.contact_us_email = environment.email_address;
        this.linkUFOP = LinksExternos.UFOP;
        this.linkUFC = LinksExternos.UFC;
        this.linkUC_BERKELEY = LinksExternos.UC_BERKELEY;
    }

    ngOnInit() { }

}
