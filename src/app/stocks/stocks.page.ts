import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {

  //Valeur de l'action à la date d'achat
  closePurchasedValue: number;
  //Valeur de l'action à la date de vente
  closeSelledValue: number;
  //Nom de l'action sélectionnée
  selectedStockName: any = 'INTC';
  //Nombre d'action vendue
  selledStocks: number;
  //Date d'achat de l'action
  purchasedDate: any = '2022-03-01';
  //Date de vente de l'action
  selledDate: any = '2022-03-31';
  //Valeur des actions à l'achat
  purchasedResult: number;
  //Plus ou moins-value à la vente
  selledResult: number;

  constructor(private http: HttpClient) {
   }

  ngOnInit() {
  }

  //Récupère la valeur de l'action à la date d'achat et de vente
  async getDataStock() {
    this.closePurchasedValue = 0;
    this.closeSelledValue = 0;
    try {
      let stocksApiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+this.selectedStockName+'&outputsize=full&apikey=d6ETRRKFK5XI2L4B6';
      const data = await this.readAPI(stocksApiUrl).toPromise();
        console.log(data);
        if(data && data['Time Series (Daily)']) {
          console.log(this.closePurchasedValue = data['Time Series (Daily)'][this.purchasedDate]['4. close']);
          console.log(this.closeSelledValue = data['Time Series (Daily)'][this.selledDate]['4. close']);
          this.closePurchasedValue = data['Time Series (Daily)'][this.purchasedDate]['4. close'];
          this.closeSelledValue = data['Time Series (Daily)'][this.selledDate]['4. close'];
        }
    } catch (error) {
      console.error(error);
    }
  }

  //Récupère la date d'achat
  selectPurchasedDate(event) {
    this.purchasedDate = this.formatDate(event.detail.value)
    this.getDataStock();
}

  //Récupère la date de vente
  selectSelledDate(event) {
    this.selledDate = this.formatDate(event.detail.value);
    this.getDataStock();
}

  //Convertir la date au même format que le JSON de l'API
  formatDate(value: string) {
    return format(parseISO(value), 'yyyy-MM-dd');
  }

  //Récupère le nombre d'actions vendues
  selectStock(event) {
    this.selectedStockName = event.detail.value;
    this.getDataStock();
}

  //Lire et renvoyer les données de l'API
  readAPI(URL: string) {
    return this.http.get(URL);
  }
  
  //Vérifier que tous les champs sont bien remplis
  isValid(){
    return this.selectedStockName && this.selledStocks
    && this.closePurchasedValue && this.closeSelledValue
  }

  //Calcul effectué suite à l'appui sur le bouton calculer
  submit() {

    this.purchasedResult = 0;
    this.selledResult =0;

      this.purchasedResult = Math.round(this.selledStocks * this.closePurchasedValue);
      this.selledResult =Math.round((this.selledStocks * this.closeSelledValue)) - this.purchasedResult;

    console.log(this.purchasedResult);
    console.log(this.selledResult);
    console.log(this.closeSelledValue);
    console.log(this.closePurchasedValue);
    console.log(this.selectedStockName);
    console.log(this.selledStocks);
    console.log(this.purchasedDate);
    console.log(this.selledDate);
   }

}
