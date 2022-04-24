import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    initialInvestment = 10000;
    interestRate = 10; // YEARLY
    depositAmount = 10;
    depositFrequency: any = "mois";
    duration = 10;
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
}
