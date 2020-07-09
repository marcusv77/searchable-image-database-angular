import { Component, OnInit } from "@angular/core";

@Component({
    selector: "cr-privacy",
    templateUrl: "./privacy.component.html",
    styleUrls: ["./privacy.component.scss"]
})
export class PrivacyComponent implements OnInit {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    constructor() { }

    ngOnInit() { }

}
