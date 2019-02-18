import { Injectable } from '@angular/core';
import {ControlButton} from './control-buttons/control-buttons.component';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  deckId: string;

  isGameStartedSource = new BehaviorSubject<boolean>(false);
  showChipsSource = new BehaviorSubject<boolean>(false);
  messageSource = new BehaviorSubject<string>('Играете? Я с вами!');
  balanceSource = new BehaviorSubject<number>(100);
  betSource = new BehaviorSubject<number>(0);
  dealerHandSource = new BehaviorSubject<string[]>([]);
  playerHandSource = new BehaviorSubject<string[]>([]);
  buttonsSource = new BehaviorSubject<ControlButton[]>([
    {
      buttonName: 'Начать игру!',
      eventType: 'game_start'
    }
  ]);

  isGameStarted = this.isGameStartedSource.asObservable();
  showChips = this.showChipsSource.asObservable();
  message = this.messageSource.asObservable();
  balance = this.balanceSource.asObservable();
  bet = this.betSource.asObservable();
  dealerHand = this.dealerHandSource.asObservable();
  playerHand = this.playerHandSource.asObservable();
  buttons = this.buttonsSource.asObservable();

  constructor() {
  }

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
    this.isGameStartedSource.next(true);

    this.playerHandSource.next([]);
    this.dealerHandSource.next([]);

    this.showChipsSource.next(true);
    this.messageSource.next('Сделайте вашу ставку');

    this.buttonsSource.next([
      {
        buttonName: 'Раздавай!',
        eventType: 'start_dealing'
      }
    ]);
  }

  startDealing() {
    this.showChipsSource.next(false);

    this.messageSource.next('Хорошей игры!');

    this.buttonsSource.next([
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
    ]);
  }

  getCard() {
    this.playerHandSource.value.push('KH');
  }

  stopDrawing() {
    this.clearHand(this.playerHandSource.value);
  }

  clearHand(hand: string[]) {
    hand.pop();
    if (hand.length > 0) {
      setTimeout(() => this.clearHand(hand), 100);
    }
  }

  makeBet(amount: number) {
    if (this.balanceSource.value - amount >= 0) {
      this.balanceSource.next(this.balanceSource.value - amount);
      this.betSource.next(this.betSource.value + amount);
    } else {
      console.log('Whoops! Something went wrong');
    }
  }
}
