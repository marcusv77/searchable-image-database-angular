import { Component, OnInit, Input, OnDestroy, AfterContentInit } from "@angular/core";
import { Router } from "@angular/router";

import { IImagemModelResultado } from "src/app/models/imagem/imagem.model";

import { PaginaImagemEntidade } from "./pagina_imagem.entidede";

@Component({
    selector: "cr-listar-cards-imagem",
    templateUrl: "./listar-cards-imagem.component.html",
    styleUrls: ["./listar-cards-imagem.component.scss"]
})

export class ListarCardsImagemComponent implements OnInit, OnDestroy, AfterContentInit {

    @Input() todasImagens: IImagemModelResultado[];
    public filteredImages: Array<PaginaImagemEntidade>;
    public paginaDeImagens: Array<PaginaImagemEntidade>;
    @Input() segmentationDatabase = false;
    @Input() classificationDatabase = false;
    public Imagem: IImagemModelResultado;
    private paginaSelecionada: number;
    private limiteInferiorIndice: number;
    private numeroImagensPorPagina: number; // Determina a quantidade de registros que cada pagina ira conter
    public totalPaginas: number;
    public desabilitarAvancarPagina: boolean;
    public desabilitarVoltarPagina: boolean;
    public paginacaoSuave: boolean;
    public tamanhoArrayImagens: number;
    public being_filtered: boolean;
    public filter_id: number;
    public filter_doi: string;
    public filter_injury: number;

    constructor(private router: Router) {
        this.paginaSelecionada = 1;
        this.limiteInferiorIndice = 1;
        this.numeroImagensPorPagina = 12;  /* due Bootstrap grid layout */
        this.tamanhoArrayImagens = 0;
        this.desabilitarAvancarPagina = true;
        this.desabilitarVoltarPagina = true;
        this.filteredImages = new Array<PaginaImagemEntidade>();
        this.paginaDeImagens = new Array<PaginaImagemEntidade>();
        this.being_filtered = false;
        this.filter_id = undefined;
        this.filter_doi = undefined;
        this.filter_injury = undefined;
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
        setTimeout(
            () => {
                this.criarPagina(this.paginaSelecionada);
            },
            250
        );
    }

    ngOnDestroy() { }

    detalheDeUmaImagem(event, img) {
        if (event.view.getSelection().type !== "Range") {
            event.preventDefault();
            this.Imagem = img;

            let route;
            if (this.classificationDatabase) {
                route = "classification/image/";
            }
            if (this.segmentationDatabase) {
                route = "segmentation/image/";
            }

            this.router.navigate(
                [
                    "classification/image/",
                    this.Imagem.id
                ]
            ).then(
                ()=>{
                    window.location.hash="#dashboard";
                }
            );
        }
    }

    proximaPagina(evento) {

        evento.preventDefault();
        if(this.paginaSelecionada < this.totalPaginas) {
            this.paginaSelecionada = this.paginaSelecionada + 1;

            this.criarPagina(this.paginaSelecionada);
        }
    }

    paginaAnterior(evento) {

        evento.preventDefault();
        if (this.paginaSelecionada > this.limiteInferiorIndice) {
            this.paginaSelecionada = this.paginaSelecionada - 1;

            this.criarPagina(this.paginaSelecionada);
        }
    }

    criarPagina(paginaSelecionada: number) {
        let set_of_images;
        if (this.being_filtered) {
            set_of_images = this.filteredImages;
        }
        else {
            set_of_images = this.todasImagens;
        }

        if (set_of_images) {
            this.paginaSelecionada = paginaSelecionada;

            this.tamanhoArrayImagens = set_of_images.length;
            this.removerElementosDaPagina();
            this.totalPaginas = Math.ceil(set_of_images.length / this.numeroImagensPorPagina);

            const inicio = (this.paginaSelecionada - 1) * this.numeroImagensPorPagina;
            let limite;
            if (this.totalPaginas == this.paginaSelecionada) {
                limite = set_of_images.length;
            }
            else {
                limite = paginaSelecionada * this.numeroImagensPorPagina;
            }

            for (let i = inicio, j = 0; i < limite; i++, j++) {
                this.paginaDeImagens.push(set_of_images[i]);
            }

            if (this.paginaSelecionada > this.limiteInferiorIndice) {
                this.desabilitarVoltarPagina = false;
            }
            else {
                this.desabilitarVoltarPagina = true;
            }

            if(this.paginaSelecionada < this.totalPaginas) {
                this.desabilitarAvancarPagina = false;
            }
            else {
                this.desabilitarAvancarPagina = true;
            }
        }
        else {
            setTimeout(() => {
                this.criarPagina(this.paginaSelecionada);
            }, 200);
        }
    }

    filterImages() {
        this.being_filtered = true;

        this.filteredImages.splice(0, this.filteredImages.length);

        const filter_id = Number(this.filter_id);
        const filter_injury = Number(this.filter_injury);

        for (const image of this.todasImagens) {
            if (filter_id != NaN && filter_id === image.id) {
                this.filteredImages.push(
                    image
                );
                continue;
            }

            if (this.filter_doi != undefined && image.doi != undefined && image.doi.includes(this.filter_doi)) {
                this.filteredImages.push(
                    image
                );
                continue;
            }

            if (filter_injury != NaN && filter_injury === image.lesao.id) {
                this.filteredImages.push(
                    image
                );
                continue;
            }
        }
        this.criarPagina(1);
    }

    resetFilterImages() {
        this.being_filtered = false;

        this.filter_id = undefined;
        this.filter_doi = undefined;
        this.filter_injury = undefined;

        this.criarPagina(1);
    }

    removerElementosDaPagina() {
        if (this.paginaDeImagens) {
            this.paginaDeImagens.splice(0, this.paginaDeImagens.length);
        }
    }

    atualizarPagina() {
        if(this.todasImagens && this.tamanhoArrayImagens != this.todasImagens.length) {

            this.seletorDePagina = 1;
            this.contadorpaginaAtual = this.seletorDePagina;
            this.criarPagina(this.contadorpaginaAtual);
        }
        else{
            setTimeout(() => {
                this.atualizarPagina();
            }, 200);
        }
    }
}
