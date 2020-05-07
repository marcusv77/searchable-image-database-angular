import { Component, OnInit, Input } from "@angular/core";

import { IImagemModelResultado } from "src/app/models/imagem/imagem.model";

@Component({
    selector: "cr-image-info",
    templateUrl: "./image-info.component.html",
    styleUrls: ["./image-info.component.scss"]
})
export class ImageInfoComponent implements OnInit {

  @Input() image: IImagemModelResultado;

  constructor() { }

  ngOnInit(): void {
  }

}
