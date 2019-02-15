import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dealerHand = [
    'KH',
    '8C',
    '8C'
  ];

  playerHand = [
    'KH',
    '8C'
  ];

  buttons = [
    {
      buttonName: 'Удвоить',
      handler: this.doubleButtonClick
    },
    {
      buttonName: 'Хватит',
      handler: this.stopButtonClick
    }
  ];

  doubleButtonClick() {
    console.log(111);
  }

  stopButtonClick() {
    console.log(222);
  }
}
