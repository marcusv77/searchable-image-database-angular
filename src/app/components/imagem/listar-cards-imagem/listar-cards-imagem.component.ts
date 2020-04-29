import { IImagemModelResultado } from "../../../models/imagem/imagem.model";
import { Component, OnInit, Input, OnDestroy, AfterContentInit } from "@angular/core";
import { Router } from "@angular/router";
import { PaginaImagemEntidade } from "./pagina_imagem.entidede";
import { Parametros } from "src/app/utils/parametros";

@Component({
    selector: "cr-listar-cards-imagem",
    templateUrl: "./listar-cards-imagem.component.html",
    styleUrls: ["./listar-cards-imagem.component.scss"]
})

export class ListarCardsImagemComponent implements OnInit, OnDestroy, AfterContentInit {

    @Input() todasImagens: IImagemModelResultado[];
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

    constructor(private router: Router) {
        this.seletorDePagina = 1;
        this.paginaSelecionada = this.seletorDePagina;
        this.contadorPaginaA = 2;
        this.contadorPaginaB = 3;
        this.contadorPaginaC = 4;
        this.contadorPaginaD = 5;
        this.limiteInferiorIndice = 1;
        this.numeroImagensPorPagina = Parametros.TOTAL_IMAGENS_POR_PAGINA;
        this.contadorPaginaA = this.paginaSelecionada -2;
        this.contadorPaginaB = this.paginaSelecionada - 1;
        this.contadorpaginaAtual = this.paginaSelecionada;
        this.contadorPaginaC = this.seletorDePagina + 1;
        this.contadorPaginaD = this.seletorDePagina + 2;
        this.tamanhoArrayImagens = 0;
        this.desabilitarAvancarPagina = false;
        this.desabilitarVoltarPagina = false;
        this.paginaDeImagens = new Array<PaginaImagemEntidade>();
    }

    ngOnInit() { }

    ngAfterContentInit(): void {
        setTimeout(() => {
            this.criarPagina(this.paginaSelecionada);
        },         250);
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

        if (this.todasImagens) {

            this.tamanhoArrayImagens = this.todasImagens.length;
            this.removerElementosDaPagina();
            this.totalPaginas = Math.ceil(this.todasImagens.length / this.numeroImagensPorPagina);
            this.definirValoresContadorPagina(paginaSelecionada);

            if (this.totalPaginas == paginaSelecionada) {

                const inicio = (paginaSelecionada - 1) * this.numeroImagensPorPagina;
                const limite = this.todasImagens.length;

                for (let i = inicio, j = 0; i < limite; i++, j++) {
                    const imagem = new PaginaImagemEntidade();
                    imagem.altura = this.todasImagens[i].altura;
                    imagem.caminho_imagem = this.todasImagens[i].caminho_imagem;
                    imagem.classificacao_aprovada = this.todasImagens[i].classificacao_aprovada;
                    imagem.codigo_lamina = this.todasImagens[i].codigo_lamina;
                    imagem.lesao = this.todasImagens[i].lesao;
                    imagem.dt_aquisicao = this.todasImagens[i].dt_aquisicao;
                    imagem.excluida = this.todasImagens[i].excluida;
                    imagem.fonte_aquisicao = this.todasImagens[i].fonte_aquisicao;
                    imagem.id = this.todasImagens[i].id;
                    imagem.id_usuario = this.todasImagens[i].id_usuario;
                    imagem.largura = this.todasImagens[i].largura;
                    imagem.nome = this.todasImagens[i].nome;
                    imagem.total_classificacoes = this.todasImagens[i].total_classificacoes;
                    imagem.total_segmentacoes = this.todasImagens[i].total_segmentacoes;

                    this.paginaDeImagens.push(imagem);
                }
            }
            else {
                // Calcula quais imagens estarão na pagina
                const inicio = (paginaSelecionada - 1) * this.numeroImagensPorPagina;
                const limite = paginaSelecionada * this.numeroImagensPorPagina;

                for (let i = inicio, j = 0; i < limite; i++, j++) {
                    const imagem = new PaginaImagemEntidade();
                    imagem.altura = this.todasImagens[i].altura;
                    imagem.caminho_imagem = this.todasImagens[i].caminho_imagem;
                    imagem.classificacao_aprovada = this.todasImagens[i].classificacao_aprovada;
                    imagem.codigo_lamina = this.todasImagens[i].codigo_lamina;
                    imagem.lesao = this.todasImagens[i].lesao;
                    imagem.dt_aquisicao = this.todasImagens[i].dt_aquisicao;
                    imagem.excluida = this.todasImagens[i].excluida;
                    imagem.fonte_aquisicao = this.todasImagens[i].fonte_aquisicao;
                    imagem.id = this.todasImagens[i].id;
                    imagem.id_usuario = this.todasImagens[i].id_usuario;
                    imagem.largura = this.todasImagens[i].largura;
                    imagem.nome = this.todasImagens[i].nome;
                    imagem.total_classificacoes = this.todasImagens[i].total_classificacoes;
                    imagem.total_segmentacoes = this.todasImagens[i].total_segmentacoes;

                    this.paginaDeImagens.push(imagem);
                }
            }
        }
        else {
            setTimeout(() => {
                this.criarPagina(this.paginaSelecionada);
            }, 200);
        }
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
