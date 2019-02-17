import { Component } from '@angular/core';
import {ControlButton} from './control-buttons/control-buttons.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dealerHand: string[];
  playerHand: string[];

  buttons: ControlButton[] = [
    {
      buttonName: 'Начать игру!',
      eventType: 'game_start'
    }
  ];

  isGameStarted = false;
  showChips = false;
  message = 'Играете? Я с вами!';
  balance = 100;
  bet = 0;
  deckId: string;

  buttonClickHandler(eventType: string) {
    switch (eventType) {
      case 'game_start':
        this.startGame();
        break;
      case 'start_dealing':
        this.startDealing();
        break;
      case 'double_bet':
        break;
      case 'get_card':
        this.getCard();
        break;
      case 'stop':
        this.stopDrawing();
        break;
      default:
        console.log('Unknown button event: ' + eventType);
    }
  }

  startGame() {
    this.isGameStarted = true;

    this.playerHand = [];
    this.dealerHand = [];

    this.showChips = true;
    this.message = 'Сделайте вашу ставку';

    this.buttons = [
      {
        buttonName: 'Раздавай!',
        eventType: 'start_dealing'
      }
    ];
  }

  startDealing() {
    this.showChips = false;

    this.message = 'Хорошей игры!';

    this.buttons = [
      {
        buttonName: 'Удвоить',
        eventType: 'double_bet'
      },
      {
        buttonName: 'Карту!',
        eventType: 'get_card'
      },
      {
        buttonName: 'Хватит',
        eventType: 'stop'
      }
    ];
  }

  getCard() {
    this.playerHand.push('KH');
  }

  stopDrawing() {
    this.clearHand(this.playerHand);
  }

  clearHand(hand: string[]) {
    hand.pop();
    if (hand.length > 0) {
      setTimeout(() => this.clearHand(hand), 100);
    }
  }

  makeBet(amount: number) {
    if (this.balance - amount >= 0) {
      this.balance -= amount;
      this.bet += amount;
    } else {
      console.log('Whoops! Something went wrong');
    }
  }
}
