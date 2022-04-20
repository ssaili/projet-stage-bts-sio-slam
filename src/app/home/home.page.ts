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
    interestFrequency: any = "trimestre";
    allResults = [];
    result: number;

    constructor() {
    }

    ngOnInit() {
    }

    selectInterestFrequency(event) {
        this.interestFrequency = event.detail.value;
    }

    selectDepositFrequency(event) {
        this.depositFrequency = event.detail.value;
    }

    submit() {
        let i = 1;
        let result = this.initialInvestment;

        let dailyRate = this.interestRate / 36500;
        let customRate;
        if (this.interestFrequency === "mois") {
            customRate = dailyRate * 30;
        } else if (this.interestFrequency === "trimestre") {
            customRate = dailyRate * 90;
        } else if (this.interestFrequency === "semestre") {
            customRate = dailyRate * 182;
        } else if (this.interestFrequency === "an") {
            customRate = dailyRate * 365;
        }

        do {

            if (this.interestRate
                && (
                    (i % 1 === 0 && this.interestFrequency === "jour")
                    || (i % 30 === 0 && this.interestFrequency === "mois")
                    || (i % 90 === 0 && this.interestFrequency === "trimestre")
                    || (i % 182 === 0 && this.interestFrequency === "semestre")
                    || (i % 365 === 0 && this.interestFrequency === "an"))
            ) {
                result += result * customRate;
            }

            if (this.depositAmount
                && (
                    (i % 30 === 0 && this.depositFrequency === "mois")
                    || (i % 90 === 0 && this.depositFrequency === "trimestre")
                    || (i % 365 === 0 && this.depositFrequency === "an"))
            ) {
                result += this.depositAmount
            }

            console.log(result);

            i++;
            this.allResults.push(result);
        } while (i < this.duration * 365);

        this.result = result;
    }
}
