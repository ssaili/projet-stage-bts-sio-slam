import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  initialInvestment = 10000;
  interestRate = 10;
  depositAmount = 10;
  depositFrequency: any;
  duration = 10;
  interestFrequency: any;
  allResults = [];
  result: number;

  constructor() { }

  ngOnInit() {
  }

  selectInterestFrequency(event){ 
    this.interestFrequency = event.detail.value;
  }

  selectDepositFrequency(event){ 
    this.depositFrequency = event.detail.value;
  }

  submit(){
let i = 0;
let result = this.initialInvestment;

do {

  if(this.interestRate 
    && (
    (i % 1 === 0 && this.interestFrequency === "jour")
  || (i % 30 === 0 && this.interestFrequency === "mois")
  || (i % 90 === 0 && this.interestFrequency === "trimestre")
  || (i % 180 === 0 && this.interestFrequency === "semestre")
  || (i % 365 === 0 && this.interestFrequency === "an"))
  ){
    result += result * (this.interestRate / 100);
  }

  if(this.depositAmount 
    && (
      (i % 30 === 0 && this.depositFrequency === "mois")
  || (i % 90 === 0 && this.depositFrequency === "trimestre")
  || (i % 365 === 0 && this.depositFrequency === "an"))
  ){
    result += this.depositAmount
  }

  i++;
  this.allResults.push(result)
} while (i < this.duration*365);
this.result= result




   }
}
