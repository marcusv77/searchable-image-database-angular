import { Component, OnInit } from "@angular/core";

@Component({
    selector: "cr-pagina-de-erro",
    templateUrl: "./pagina-de-erro.component.html",
    styleUrls: ["./pagina-de-erro.component.scss"]
})
export class PaginaDeErroComponent implements OnInit {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Error",
        "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    constructor() { }

    ngOnInit() { }

}
