import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    initialInvestment: number;
    interestRate: number; // YEARLY
    depositAmount: number;
    depositFrequency: any = "mois";
    duration: number;
    interestFrequency: any = "trimestres";
    allResults = [];
    result: number;
    totalInterest: number;

    constructor() {
    }

    ngOnInit() { }

    selectInterestFrequency(event) {
        this.interestFrequency = event.detail.value;
        this.submit();
    }

    selectDepositFrequency(event) {
        this.depositFrequency = event.detail.value;
        this.submit();
    }


    submit() {

        if (this.initialInvestment && this.interestRate && this.duration) {

            let i = 1;
            let result = this.initialInvestment;

            let dailyRate = this.interestRate / 36500;
            let customRate;
            if (this.interestFrequency === "jours") {
                customRate = dailyRate;
            } else if (this.interestFrequency === "mois") {
                customRate = dailyRate * 30;
            } else if (this.interestFrequency === "trimestres") {
                customRate = dailyRate * 90;
            } else if (this.interestFrequency === "semestres") {
                customRate = dailyRate * 180;
            } else if (this.interestFrequency === "ans") {
                customRate = dailyRate * 365;
            }

            do {

                if (this.interestRate
                    && (
                        (i % 1 === 0 && this.interestFrequency === "jours")
                        || (i % 30 === 0 && this.interestFrequency === "mois")
                        || (i % 90 === 0 && this.interestFrequency === "trimestres")
                        || (i % 180 === 0 && this.interestFrequency === "semestres")
                        || (i % 365 === 0 && this.interestFrequency === "ans"))
                ) {
                    result += result * customRate;
                }

                if (this.depositAmount
                    && (
                        (i % 30 === 0 && this.depositFrequency === "mois")
                        || (i % 90 === 0 && this.depositFrequency === "trimestres")
                        || (i % 365 === 0 && this.depositFrequency === "ans"))
                ) {
                    result += this.depositAmount
                }

                console.log(result);

                i++;
                this.allResults.push(result);
            } while (i < this.duration * 365);

            this.result = Math.round((result) * 100) / 100;
            this.totalInterest = Math.round((result - this.initialInvestment) * 100) / 100;
        }
    }

    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  } as any;
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

}
