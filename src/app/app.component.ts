import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {


  public appPages = [
    { title: 'Intérêts composés', url: '/home', icon: 'calculator' },
    { title: 'Gains sur actions', url: '/stocks', icon: 'bar-chart' },
    { title: 'Nous contacter', url: '/contact', icon: 'send' },
  ];

  constructor() {}
}
