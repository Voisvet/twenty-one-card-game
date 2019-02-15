import { Component } from '@angular/core';
import {ControlButton} from './control-buttons/control-buttons.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dealerHand: [string];

  playerHand: [string];

  buttons: [ControlButton];

  balance = 100;

  doubleButtonClick() {
    console.log(111);
  }

  stopButtonClick() {
    console.log(222);
  }

  bet(amount: number) {
    if (this.balance - amount >= 0) {
      this.balance -= amount;
    } else {
      console.log('Whoops! Something went wrong');
    }
  }
}
