import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cr-user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
    @Input() heading: string;

    constructor() { }

    ngOnInit(): void {
    }

}
