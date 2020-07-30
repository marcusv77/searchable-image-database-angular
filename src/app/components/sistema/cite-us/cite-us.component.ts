import { Component, OnInit } from "@angular/core";

@Component({
    selector: "cr-cite-us",
    templateUrl: "./cite-us.component.html",
    styleUrls: ["./cite-us.component.scss"]
})
export class CiteUsComponent implements OnInit {
    today: any;

    constructor() { }

    ngOnInit() {
        this.today = new Date();
    }

}
