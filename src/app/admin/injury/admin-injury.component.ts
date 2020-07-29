import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ILesaoModelResultado, ILesaoModelRequisicao } from "src/app/models/imagem/lesao.model";

import { ImagemService } from "src/app/services/imagens.service";

import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";

@Component({
    selector: 'cr-admin-injury',
    templateUrl: './admin-injury.component.html',
    styleUrls: ['./admin-injury.component.scss']
})
export class AdminInjuryComponent implements OnInit {

    @ViewChild("injury_modal_close", { static: true }) injury_modal_close: any;
    public all_injuries: ILesaoModelResultado[];
    private objetoErro: ObjetoErro;
    public carregando: boolean;
    public injury_id2edit: number;
    public injury_form = new FormGroup({
        nome: new FormControl(''),
        detalhes: new FormControl(''),
        grade: new FormControl(''),
    });

    constructor(private image_service: ImagemService) {
        this.carregando = false;
        this.injury_id2edit = undefined;
    }

    ngOnInit(): void {
        this.get_all_injuries();
    }

    get_all_injuries() {
        this.carregando = true;
        this.image_service.listarLesoes()
            .subscribe(
                (all_injuries) => {
                    this.carregando = false;
                    this.all_injuries = all_injuries;
                },
                (error) => {
                    this.carregando = false;
                    this.objetoErro = error.error;

                    switch(this.objetoErro.status_code) {

                    case HttpStatusCode.UNAUTHORIZED:
                    case HttpStatusCode.NOT_FOUND:
                    case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    default: {
                        console.log(error);
                        break;
                    }
                    }
                }
            );
    }

    load_edit_injury_modal(injury_id: number) {
        this.injury_id2edit = this.all_injuries[injury_id].id;
        this.injury_form.patchValue({
            nome: this.all_injuries[injury_id].nome,
            detalhes: this.all_injuries[injury_id].detalhes,
            grade: this.all_injuries[injury_id].grade,
        });
    }

    edit_injury() {
        console.log(this.injury_form.value);
        this.image_service.edit_injury(
            this.injury_id2edit,
            this.injury_form.value
        ).subscribe(
            () => {
                console.log("Injury changed");

                this.injury_modal_close.nativeElement.click();

                // TODO Load new data
            },
            (err) => {
                console.log(err);
            }
        );
    }

}
