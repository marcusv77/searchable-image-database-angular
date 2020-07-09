import { Component, OnInit } from "@angular/core";

@Component({
    selector: "cr-terms",
    templateUrl: "./terms.component.html",
    styleUrls: ["./terms.component.scss"]
})
export class TermsComponent implements OnInit {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service",
        "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    constructor() { }

    ngOnInit() { }

}
