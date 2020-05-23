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
    public contadorPaginaA: number;
    public contadorPaginaB: number;
    public contadorpaginaAtual: number;
    public contadorPaginaC: number;
    public contadorPaginaD: number;
    public seletorDePagina: number;
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
        this.seletorDePagina = 1;
        this.paginaSelecionada = this.seletorDePagina;
        this.contadorPaginaA = 2;
        this.contadorPaginaB = 3;
        this.contadorPaginaC = 4;
        this.contadorPaginaD = 5;
        this.limiteInferiorIndice = 1;
        this.numeroImagensPorPagina = 12;  /* due Bootstrap grid layout */
        this.contadorPaginaA = this.paginaSelecionada -2;
        this.contadorPaginaB = this.paginaSelecionada - 1;
        this.contadorpaginaAtual = this.paginaSelecionada;
        this.contadorPaginaC = this.seletorDePagina + 1;
        this.contadorPaginaD = this.seletorDePagina + 2;
        this.tamanhoArrayImagens = 0;
        this.desabilitarAvancarPagina = false;
        this.desabilitarVoltarPagina = false;
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

    detalheDeUmaImagem($event, img) {

        $event.preventDefault();
        this.Imagem = img;

        if (this.classificationDatabase) {
            this.router.navigate(["classification/image/", this.Imagem.id]);
        }

        if (this.segmentationDatabase) {
            this.router.navigate(["segmentation/image/", this.Imagem.id]);
        }
    }

    proximaPagina(evento) {

        evento.preventDefault();
        if(this.seletorDePagina >= this.totalPaginas) {
            this.desabilitarAvancarPagina = true;
        }
        else if (this.seletorDePagina >= this.limiteInferiorIndice && this.seletorDePagina < this.totalPaginas) {

            // Garante que o seletor estara no intervalo valido
            this.seletorDePagina++;
            this.paginaSelecionada = this.seletorDePagina;
            this.definirValoresContadorPagina(this.paginaSelecionada);
            this.desabilitarAvancarPagina = false;
            this.criarPagina(this.paginaSelecionada);
        }
        else if(this.seletorDePagina >= this.totalPaginas || (this.totalPaginas - this.seletorDePagina) <= 0) {

            // muda o seletor para o intervalo valido caso esteja maior que o devido
            this.seletorDePagina = this.totalPaginas;
            this.paginaSelecionada = this.seletorDePagina;
            this.definirValoresContadorPagina(this.paginaSelecionada);
            this.desabilitarAvancarPagina = false;
            this.criarPagina(this.paginaSelecionada);
        }
    }

    paginaAnterior(evento) {

        evento.preventDefault();
        if (this.seletorDePagina <= this.limiteInferiorIndice) {

            // Garante que o seletor nao fica abaixo do que deve
            this.seletorDePagina = this.limiteInferiorIndice;
            this.paginaSelecionada = this.seletorDePagina;
            this.definirValoresContadorPagina(this.paginaSelecionada);
            this.desabilitarVoltarPagina = true;
            this.criarPagina(this.paginaSelecionada);
        }
        else {

            // Decrementa o contador de pagina
            this.seletorDePagina--;
            this.paginaSelecionada = this.seletorDePagina;
            this.definirValoresContadorPagina(this.paginaSelecionada);
            this.desabilitarVoltarPagina = false;
            this.criarPagina(this.paginaSelecionada);
        }
    }

    selecionarPagina(evento, paginaSelecionada: number) {

        evento.preventDefault();
        this.desabilitarAvancarPagina = false;
        this.desabilitarVoltarPagina = false;
        this.paginaSelecionada = paginaSelecionada;
        this.seletorDePagina = paginaSelecionada;
        this.definirValoresContadorPagina(this.paginaSelecionada);
        this.criarPagina(this.paginaSelecionada);
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

            this.tamanhoArrayImagens = set_of_images.length;
            this.removerElementosDaPagina();
            this.totalPaginas = Math.ceil(set_of_images.length / this.numeroImagensPorPagina);
            this.definirValoresContadorPagina(paginaSelecionada);

            const inicio = (paginaSelecionada - 1) * this.numeroImagensPorPagina;
            let limite;
            if (this.totalPaginas == paginaSelecionada) {
                limite = this.filteredImages.length;
            }
            else {
                limite = paginaSelecionada * this.numeroImagensPorPagina;
            }

            for (let i = inicio, j = 0; i < limite; i++, j++) {
                this.paginaDeImagens.push(set_of_images[i]);
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

    definirValoresContadorPagina(paginaSelecionada: number) {
        this.contadorpaginaAtual = paginaSelecionada;
        this.contadorPaginaA = this.contadorpaginaAtual -2;
        this.contadorPaginaB = this.contadorpaginaAtual - 1;
        this.contadorPaginaC = this.contadorpaginaAtual + 1;
        this.contadorPaginaD = this.contadorpaginaAtual + 2;
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
