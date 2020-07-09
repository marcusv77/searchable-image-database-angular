import { Component, OnInit } from "@angular/core";

@Component({
    selector: "cr-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "About",
        "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    constructor() { }

    ngOnInit() { }

}
