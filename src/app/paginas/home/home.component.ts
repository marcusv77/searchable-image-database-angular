import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ImagemService } from 'src/app/services/imagens_service/imagens.service';
import { IEstatisticaCelulasDoentesModelResultado } from 'src/app/models/imagem/estatistica_celulas_doentes.model';
import { ObjetoErro } from 'src/app/utils/tratamento_erro/ObjetoErro';
import { HttpStatusCode } from 'src/app/utils/tratamento_erro/Http_Status_Code';
import { TipoLesao } from 'src/app/utils/tipo_doencas';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'cr-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

    //#region Propriedades
    private contagemCelulas: IEstatisticaCelulasDoentesModelResultado;
    public graficoPizza: Chart;
    private objetoErro: ObjetoErro;
    private obterContagemCelulasSubscription: Subscription;
    public carregando: boolean;
    //#endregion

    //#region Construtor
    constructor(private imagemService: ImagemService) {
        this.carregando = false;
    }
    //#endregion

    //#region Inicialização
    ngOnInit() {
        this.carregando = false;
        this.objetoErro = new ObjetoErro();
        this.obterContagemCelulasDoentes();
    }

    ngOnDestroy() {
        if(this.obterContagemCelulasSubscription) {this.obterContagemCelulasSubscription.unsubscribe()};
    }

    obterContagemCelulasDoentes() {

        this.carregando = true;
        this.obterContagemCelulasSubscription =
        this.imagemService.obterContagemNucleosDoentes()
        .subscribe(
            (retorno) => {
                this.contagemCelulas = retorno;
                this.carregando = false;
                this.graficoPizza = this.construirGrafico();
            },
            (erro) => {
                this.carregando = false;
                this.objetoErro = erro.error;
                
                switch(this.objetoErro.status_code) {

                    case HttpStatusCode.UNAUTHORIZED: {
                        alert(this.objetoErro.mensagem);
                        break;
                    }

                    case HttpStatusCode.INTERNAL_SERVER_ERROR: {
                        alert(this.objetoErro.mensagem);
                        break;
                    }

                    default: {
                        alert(erro);
                        break;
                    }
                }
            }
        );
    }

    construirGrafico(): Chart {

        return new Chart({
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Classified nucleis in the imagem database'
            },
            subtitle: {
                text: ''
            },
            credits: {
                enabled: true
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>',
                //valueSuffix: '%'
            },
            plotOptions: {
                series: {
                    allowPointSelect: true
                },
                pie: {
                    dataLabels: {
                        enabled: false,
                        connectorColor: 'silver'
                    },
                    shadow: false,
                    center: ['50%', '50%'],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true
                }
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            enabled: false
                        }
                    }
                }]
            },
            series: [
                {
                    type: null,
                    name: 'Nuclei sample',
                    colorByPoint: true,
                    data: [
                        { name: TipoLesao.NORMAL, y: this.contagemCelulas.Normal },
                        { name: TipoLesao.ASC_US, y: this.contagemCelulas.AscUs },
                        { name: TipoLesao.L_SIL, y: this.contagemCelulas.LSil },
                        { name: TipoLesao.ASC_H, y: this.contagemCelulas.AscH },
                        { name: TipoLesao.H_SIL, y: this.contagemCelulas.HSil },
                        { name: TipoLesao.CARCINOMA, y: this.contagemCelulas.Carcinoma }
                    ]
                }
            ]
        });
    }
    //#endregion
}
