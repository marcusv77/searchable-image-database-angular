import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

import { environment } from "src/environments/environment";

import { IImagemModelResultado } from "src/app/models/imagem/imagem.model";
import { ImagemService } from "src/app/services/imagens.service";
import { HttpStatusCode } from "src/app/utils/tratamento_erro/Http_Status_Code";
import { IDescricaoModelResultado } from "src/app/models/imagem/descricao.model";
import { ObjetoErro } from "src/app/utils/tratamento_erro/ObjetoErro";
import { IObjetoSessaoModel } from "src/app/models/autenticacao/objeto_sessao.model";
import { ArmazenamentoBrowser } from "src/app/utils/browser_storage/browser_storage";
import { ChavesArmazenamentoBrowser } from "src/app/utils/chaves_armazenamento_browser";
import { ISegmentacaoCelulaModelResultado } from "src/app/models/segmentacao/segmentacao_celula.model";
import { ComunicacaoApi } from "../../api_cric_database/comunicacao_api";
import { DescricaoCelulaEntidade } from "./descricao_celula.entidade";
import { Mensagens } from "src/app/utils/mensagens";
import { SegmentacaoHelper } from "src/app/helper/segmentacao.helper";

declare const getModal: any; // Função javascript
declare const setModal: any; // Função javascript
declare const segmentos: any; // Função javascript
declare const initCanvas: any; // Função javascript
declare const limparVetorSegmentos: any; // Função javascript
declare const exibirSegmentacoes: any; // Função javascript

@Component({
    selector: "cr-segmentar-imagem",
    templateUrl: "./segmentar-imagem.component.html",
    styleUrls: ["./segmentar-imagem.component.scss"]
})

export class SegmentarImagemComponent implements OnInit, OnDestroy {

    public schema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "CRIC Cervix Segmentation",
        "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    public schema_sample = {
        "@context": "http://bioschemas.org",
        "@type": "Sample",
        "subjectOf": "http://database.cric.com.br/",
        "name": `CRIC Cervix Segmentation #undefined`
    };

    private SegmentacaoHelper: SegmentacaoHelper;
    private armazenamentoBrowser: ArmazenamentoBrowser;
    private cadastrarSegmentacaoSubscription: Subscription;
    private comunicacaoApi: ComunicacaoApi;
    private excluirRegistroDeSegmentacaoSubscription: Subscription;
    private indiceAnterior: number;
    private listarDescricoesSubscription: Subscription;
    private listarSegmentacoesCelulaSubscription: Subscription;
    private objetoErro: ObjetoErro;
    private obterImagemSubscription: Subscription;
    public caminho_imagem: string;
    public carregando = false;
    public codigoDescricao: Array<number>;
    public descricao: DescricaoCelulaEntidade;
    public id_descricao: number;
    public id_imagem: number;
    public imagem: IImagemModelResultado;
    public indiceSelecionado: number;
    public indiceSelecionadoPadrao: number;
    public objetoSessao: IObjetoSessaoModel;
    public permitirCadastroSegmentacao: boolean;
    public rotulo = true;
    public todasDescricoes: IDescricaoModelResultado[];
    public todasSegmentacoes: ISegmentacaoCelulaModelResultado;
    public vetorDePontos: any;
    public vetorSelecaoDescricao: Array<IDescricaoModelResultado[]>;
    public playground: boolean;

    constructor(private imagemService: ImagemService, private activatedRoute: ActivatedRoute) {
        this.playground = environment.playground === "true";
        this.comunicacaoApi = new ComunicacaoApi();
        this.armazenamentoBrowser = new ArmazenamentoBrowser();
        this.objetoErro = new ObjetoErro();
        this.descricao = new DescricaoCelulaEntidade();
        this.indiceSelecionadoPadrao = -1;
        this.id_descricao = 0;
        this.indiceAnterior = 0;
        this.codigoDescricao = new Array<number>();
        this.permitirCadastroSegmentacao = false;
        this.SegmentacaoHelper = new SegmentacaoHelper();
        this.vetorSelecaoDescricao = new Array<IDescricaoModelResultado[]>();
    }

    ngOnInit() {

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const id = Number(params.get("id"));
            this.id_imagem = id;

            this.schema_sample.name = `CRIC Cervix Segmentation #${this.id_imagem}`;
        });

        this.indiceSelecionado = this.indiceSelecionadoPadrao;
        this.objetoSessao = JSON.parse(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO));
        this.obterUmaImagem(this.id_imagem);
        this.obterTodasDescricoes();
        this.vetorDePontos = segmentos;

        setTimeout(() => {
            this.iniciarSegmentacao();
        },         500);
    }

    ngOnDestroy() {
        if(this.obterImagemSubscription) {
            this.obterImagemSubscription.unsubscribe();
        }
        if(this.cadastrarSegmentacaoSubscription) {
            this.cadastrarSegmentacaoSubscription.unsubscribe();
        }
        if(this.listarSegmentacoesCelulaSubscription) {
            this.listarSegmentacoesCelulaSubscription.unsubscribe();
        }
        if(this.listarDescricoesSubscription) {
            this.listarDescricoesSubscription.unsubscribe();
        }
        if(this.excluirRegistroDeSegmentacaoSubscription) {
            this.excluirRegistroDeSegmentacaoSubscription.unsubscribe();
        }
    }

    obterUmaImagem(id_imagem: number) {

        this.carregando = true;
        this.obterImagemSubscription =
        this.imagemService.obterImagem(id_imagem)
            .subscribe(
                (retorno) => {
                    this.imagem = retorno;
                    this.caminho_imagem = `${this.comunicacaoApi.getImageURL()}/${this.imagem.nome}`;
                    this.carregando = false;
                    if(this.objetoSessao){
                        this.listarTodasSegmentacoesDeDeCelula(this.id_imagem, this.objetoSessao.id_usuario);
                    }
                    else{
                        this.listarTodasSegmentacoesDeDeCelula(this.id_imagem, 1);
                    }
                },
                (erro) => {
                    this.carregando = false;
                    this.objetoErro = erro.error;

                    switch(this.objetoErro.status) {

                    case HttpStatusCode.UNAUTHORIZED:
                    case HttpStatusCode.BAD_REQUEST:
                    case HttpStatusCode.NOT_FOUND:
                    case HttpStatusCode.FORBIDDEN:
                    case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    default: {
                        console.log(erro);
                        break;
                    }
                    }
                }
            );
    }

    cadastrarSegmentacao(possuiNucleoSegmentado: boolean) {

        this.carregando = true;
        const requisicao = {
            id_descricao: this.id_descricao,
            alturaCanvas: this.imagem.altura,
            larguraCanvas: this.imagem.largura,
            alturaOriginalImg: this.imagem.altura,
            larguraOriginalImg: this.imagem.largura,
            segmentos_citoplasma: this.vetorDePontos[0],
            segmentos_nucleo: possuiNucleoSegmentado ? this.vetorDePontos[1] : []
        };

        this.cadastrarSegmentacaoSubscription =
        this.imagemService.cadastrarSegmentacao(this.id_imagem, this.objetoSessao.id_usuario, requisicao)
            .subscribe(
                (retorno) => {
                    this.todasSegmentacoes = retorno;
                    this.carregando = false;
                    this.definirListaDescricoesInicial();
                    this.indiceSelecionado = -1;
                    this.listarTodasSegmentacoesDeDeCelula(this.id_imagem, this.objetoSessao.id_usuario);
                    console.log("Segmentation saved");
                },
                (erro) => {
                    this.carregando = false;
                    this.objetoErro = erro.error;

                    switch(this.objetoErro.status) {

                    case HttpStatusCode.UNAUTHORIZED: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.BAD_REQUEST: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.NOT_FOUND: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.FORBIDDEN: {
                        console.log(this.objetoErro.mensagem);
                        this.desfazerSegmentacao();
                        break;
                    }

                    case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    default: {
                        console.log(erro);
                        break;
                    }
                    }
                }
            );

        this.definirEstadoModal(false);
        this.limparTodasSegmentacoes();
    }

    listarTodasSegmentacoesDeDeCelula(id_imagem: number, id_analista: number) {

        this.carregando = true;
        this.listarSegmentacoesCelulaSubscription =
        this.imagemService.listarSegmentacoesCelula(id_imagem, id_analista)
            .subscribe(
                (retorno) => {
                    this.todasSegmentacoes = retorno;
                    exibirSegmentacoes(this.todasSegmentacoes, this.indiceSelecionado, this.rotulo);
                    this.carregando = false;
                },
                (erro) => {

                    this.carregando = false;
                    this.objetoErro = erro.error;

                    switch(this.objetoErro.status) {

                    case HttpStatusCode.UNAUTHORIZED: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.BAD_REQUEST: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.NOT_FOUND: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    default: {
                        console.log(erro);
                        break;
                    }
                    }
                }
            );
    }

    obterTodasDescricoes() {

        this.carregando = true;
        this.listarDescricoesSubscription =
        this.imagemService.listarDescricoes()
            .subscribe(
                (retorno) => {
                    this.todasDescricoes = retorno;
                    this.definirListaDescricoesInicial();
                    this.carregando = false;
                },
                (erro) => {
                    this.carregando = false;
                    this.objetoErro = erro.error;

                    switch(this.objetoErro.status) {

                    case HttpStatusCode.UNAUTHORIZED: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.NOT_FOUND: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                        console.log(this.objetoErro.mensagem);
                        break;
                    }

                    default: {
                        console.log(erro);
                        break;
                    }
                    }
                }
            );
    }

    exibirSegmentacaoFormaSeletiva() {

        if(this.todasSegmentacoes.celulas[this.indiceSelecionado]) {
            this.descricao.id = this.todasSegmentacoes.celulas[this.indiceSelecionado].descricao.id;
            this.descricao.nome = this.todasSegmentacoes.celulas[this.indiceSelecionado].descricao.nome;
            this.descricao.codigo = this.todasSegmentacoes.celulas[this.indiceSelecionado].descricao.codigo;
            this.descricao.detalhes = "Pegar estes detalhes pelo codigo que gera a arvore de informacoes";
        }
        this.rotulo = true;
        exibirSegmentacoes(this.todasSegmentacoes, Number(this.indiceSelecionado), this.rotulo);
    }

    permitirCadastro(valor: boolean) {
        this.permitirCadastroSegmentacao = valor;
    }

    iniciarSegmentacao() {
        initCanvas(this.imagem);
    }

    desfazerSegmentacao(): void {
        limparVetorSegmentos();
    }

    obterEstadoModal(): boolean {
        return getModal();
    }

    definirEstadoModal(estado): void {
        setModal(estado);
    }

    limparTodasSegmentacoes() {
        limparVetorSegmentos();
        this.vetorDePontos = segmentos;
    }

    excluitSegmentacao(indiceSelecionado: number) {

        this.carregando = true;
        if(confirm(Mensagens.EXCLUIR_SEGMENTACAO)) {

            const parametrosRequisicao = {
                id_imagem: this.id_imagem,
                id_celula: this.todasSegmentacoes.celulas[indiceSelecionado].id,
                id_usuario: this.objetoSessao.id_usuario
            };

            this.excluirRegistroDeSegmentacaoSubscription =
            this.imagemService.excluirRegistroDeSegmentacao(parametrosRequisicao)
                .subscribe(
                    (retorno) => {
                        this.todasSegmentacoes = retorno;
                        this.limparTodasSegmentacoes();
                        this.indiceSelecionado = -1;
                        exibirSegmentacoes(this.todasSegmentacoes, this.indiceSelecionado, this.rotulo);
                        this.carregando = false;
                    },
                    (erro) => {
                        this.carregando = false;
                        this.objetoErro = erro.error;

                        switch(this.objetoErro.status) {

                        case HttpStatusCode.UNAUTHORIZED: {
                            console.log(this.objetoErro.mensagem);
                            break;
                        }

                        case HttpStatusCode.BAD_REQUEST: {
                            console.log(this.objetoErro.mensagem);
                            break;
                        }

                        case HttpStatusCode.NOT_FOUND: {
                            console.log(this.objetoErro.mensagem);
                            break;
                        }

                        case HttpStatusCode.FORBIDDEN: {
                            console.log(this.objetoErro.mensagem);
                            break;
                        }

                        case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                            console.log(this.objetoErro.mensagem);
                            break;
                        }

                        default: {
                            console.log(erro);
                            break;
                        }
                        }
                    }
                );
        }
        else {
            this.carregando = false;
        }
    }

    definirListaDescricoesInicial() {
        this.vetorSelecaoDescricao = [];
        this.vetorSelecaoDescricao[0] = (this.SegmentacaoHelper.filtrarDescricoesPorCodigo(this.todasDescricoes, 1));
    }

    atualizarVetorDescricao(indice: number) {

        this.permitirCadastro(false);

        // Encontra o indice da descrição atual
        const indiceCodigoDescricao = indice -1;

        const numeroCaracteresProximoIndice = this.codigoDescricao[indiceCodigoDescricao].toString().length + 1;
        const todasDescricoesFiltradas = this.SegmentacaoHelper.filtrarDescricoesPorCodigo(this.todasDescricoes, numeroCaracteresProximoIndice);
        this.vetorSelecaoDescricao[indice] = this.SegmentacaoHelper.filtrarDescricoesPorPrefixo(todasDescricoesFiltradas, this.codigoDescricao[indiceCodigoDescricao].toString());

        // Mantem os arrays limpos quando não possuir valores utilizados
        if(this.indiceAnterior > indice) {
            for(let i = indice +1; i < this.vetorSelecaoDescricao.length; i++) {
                this.vetorSelecaoDescricao[i] = [];
            }
        }
        else if(this.indiceAnterior == indice) {
            this.vetorSelecaoDescricao[indice +1] = [];
        }

        this.indiceAnterior = indice;

        // Realizar cadastro conforme a estrutura segmentada
        if((this.vetorSelecaoDescricao[indice].length == 0) && this.codigoDescricao.toString()[0] == "1") {
            this.permitirCadastro(true);
        }
        else if (this.vetorSelecaoDescricao[indice].length == 0){
            this.permitirCadastro(true);
        }
    }

    obterIdDescricao() {

        const ultimoCodigo = this.codigoDescricao.length - 1;
        this.todasDescricoes.forEach((descricao) => {
            if(descricao.codigo == this.codigoDescricao[ultimoCodigo]) {
                this.id_descricao = descricao.id;
            }
        });
    }

    limparVetorSelecaoDescricao() {

        for(let i = 1; i < this.vetorSelecaoDescricao.length; i++) {
            this.vetorSelecaoDescricao[i] = [];
        }

        for(let i = 1; i < this.vetorSelecaoDescricao.length; i++) {
            this.codigoDescricao[i] = 0;
        }
    }

    validarSegmetacaoDoCitoplasma() {
        this.obterIdDescricao();
        console.log("The cytoplasm was registered. Please segment the nucleus.");
    }

    cadastrarSegmentacaoElementoAnucleado(valor: boolean) {
        this.obterIdDescricao();
        this.cadastrarSegmentacao(false);
    }

    dasabilitarRotulo() {
        this.rotulo = !this.rotulo;
        exibirSegmentacoes(this.todasSegmentacoes, this.indiceSelecionado, this.rotulo);
    }

    save_image() {}

    save_json() {}

    save_csv() {}
}
