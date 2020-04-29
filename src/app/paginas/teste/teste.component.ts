import { Component, OnInit, OnDestroy } from "@angular/core";
import { Chart } from "angular-highcharts";

@Component({
    selector: "cr-teste",
    templateUrl: "./teste.component.html",
    styleUrls: ["./teste.component.scss"]
})

export class TesteComponent implements OnInit, OnDestroy {

    constructor() { }

    private dados = [300, 100, 58, 152, 75, 149, 123, 126];

    chart = new Chart({
        chart: {
            type: "pie"
        },
        title: {
            text: "Avaliable nuclei in database"
        },
        subtitle: {
            text: "Um subtitulo"
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y}</b>"
            // valueSuffix: '%'
        },
        plotOptions: {
            series: {
                allowPointSelect: true
            },
            pie: {
                dataLabels: {
                    enabled: false,
                    connectorColor: "silver"
                },
                shadow: false,
                center: ["50%", "50%"],
                allowPointSelect: true,
                cursor: "pointer",
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
                name: "Nuclei sample",
                colorByPoint: true,
                data: [
                    { name: "Normal", y: this.dados[0] },
                    { name: "H-SIL", y: this.dados[1] },
                    { name: "L-SIL", y: this.dados[2] },
                    { name: "ASC-US", y: this.dados[3] },
                    { name: "ASC-H", y: this.dados[4] },
                    { name: "Carcinoma", y: this.dados[5] }
                ]
            }
        ]
    });

    ngOnInit() { }

    ngOnDestroy() { }

    testarLink($event) {
        $event.preventDefault();
    }
}
