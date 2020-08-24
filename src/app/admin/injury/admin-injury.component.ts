import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILesaoModelResultado, ILesaoModelRequisicao } from "src/app/models/imagem/lesao.model";

import { InjuriesService } from "src/app/services/injuries.service";

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
        nome: new FormControl('', Validators.required),
        detalhes: new FormControl(''),
        grade: new FormControl('', Validators.required),
    });

    constructor(private injuries_service: InjuriesService) {
        this.carregando = false;
        this.injury_id2edit = undefined;
    }

    ngOnInit(): void {
        this.get_all_injuries();
    }

    get_all_injuries() {
        this.carregando = true;
        this.injuries_service.listarLesoes()
            .subscribe(
                (all_injuries) => {
                    this.carregando = false;
                    this.all_injuries = all_injuries;
                },
                (error) => {
                    this.carregando = false;
                    this.objetoErro = error.error;

                    switch(this.objetoErro.status) {

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

    load_create_injury_modal() {
        this.injury_id2edit = undefined;
        this.injury_form.patchValue({
            nome: undefined,
            detalhes: undefined,
            grade: undefined,
        });
    }

    create_injury() {
        this.injuries_service.create_injury(
            this.injury_form.value
        ).subscribe(
            (new_injury) => {
                this.injury_modal_close.nativeElement.click();

                this.all_injuries.push(new_injury);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    load_edit_injury_modal(injury_idx: number) {
        this.injury_id2edit = this.all_injuries[injury_idx].id;
        this.injury_form.patchValue({
            nome: this.all_injuries[injury_idx].nome,
            detalhes: this.all_injuries[injury_idx].detalhes,
            grade: this.all_injuries[injury_idx].grade,
        });
    }

    edit_injury() {
        this.injuries_service.edit_injury(
            this.injury_id2edit,
            this.injury_form.value
        ).subscribe(
            () => {
                this.injury_modal_close.nativeElement.click();

                const injury_idx = this.all_injuries.findIndex((item => item.id === this.injury_id2edit));
                this.all_injuries[injury_idx] = {
                    id: this.injury_id2edit,
                    ...this.injury_form.value
                };
            },
            (err) => {
                console.log(err);
            }
        );
    }

}
