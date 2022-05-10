import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartData, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    //Investissement initial
    initialInvestment: number;
    //Taux d'intérêt annuel
    interestRate: number;
    //Montant des versements
    depositAmount: number;
    //Fréquence des versements
    depositFrequency: any = "mois";
    //Durée
    duration: number;
    //Fréquence de calcul des intérêts
    interestFrequency: any = "trimestres";
    //Valeur totale du placement
    result: number;
    //Total des versements effectuées
    totalDepositAmount = 0;
    //Total des intérêts gagnés
    totalInterest: number;

    barChartType: ChartType = 'pie';
    barChartOptions = {
        responsive: true,
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

    barChartData: ChartData<'pie'>;


    constructor() {
    }

    ngOnInit() {
    }

    //Récupère la fréquence de calcul des intérêts
    selectInterestFrequency(event) {
        this.interestFrequency = event.detail.value;
        this.submit();
    }

    //Récupère la fréquence des versements
    selectDepositFrequency(event) {
        this.depositFrequency = event.detail.value;
        this.submit();
    }


    submit() {

        if (this.initialInvestment && this.interestRate && this.duration) {

            let i = 1;
            let result = this.initialInvestment;
        
            //Calcul le taux en fonction de la fréquence de calcul des intérêts choisi
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

            this.totalDepositAmount = 0;

            do {
                //Calcul de la valeur total du placement en fonction de la fréquence de calcul des intérêts choisi
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

                //Prise en compte des éventuels versement effectués
                if (this.depositAmount
                    && (
                        (i % 30 === 0 && this.depositFrequency === "mois")
                        || (i % 90 === 0 && this.depositFrequency === "trimestres")
                        || (i % 365 === 0 && this.depositFrequency === "ans"))
                ) {
                    result += this.depositAmount;
                    this.totalDepositAmount += this.depositAmount;
                }

                console.log(result);
                console.log(this.totalDepositAmount)

                i++;
            } while (i < this.duration * 365);//boucle éxécutée tant que l'on a pas atteint la durrée saisie

            this.result = Math.round((result) * 100) / 100;
            this.totalInterest = Math.round((result - this.initialInvestment - this.totalDepositAmount) * 100) / 100;
        }

        this.updateChart();

    }

    
    updateChart() {
        this.barChartData = {
            labels: ['Investisssement initial', 'Total des intérêts gagnés', 'Total des versements effectués'],
            datasets: [{
                label: '',
                data: [this.initialInvestment, this.totalInterest, this.totalDepositAmount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(0, 128, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(0, 128, 0, 1)',
                ],
                borderWidth: 1
            }]
        };

    }

}
