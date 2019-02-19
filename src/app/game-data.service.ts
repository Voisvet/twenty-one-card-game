import { Injectable } from '@angular/core';
import {ControlButton} from './control-buttons/control-buttons.component';
import {BehaviorSubject} from 'rxjs';
import {Card, DeckApiService} from './deck-api.service';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private deckApiService: DeckApiService) {
  }

  private static points = {
    KING: 10,
    QUEEN: 10,
    JACK: 10,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2
  };

  isGameStartedSource = new BehaviorSubject<boolean>(false);
  showChipsSource = new BehaviorSubject<boolean>(false);
  messageSource = new BehaviorSubject<string>('Играете? Я с вами!');
  balanceSource = new BehaviorSubject<number>(100);
  betSource = new BehaviorSubject<number>(0);
  dealerHandSource = new BehaviorSubject<Card[]>([]);
  playerHandSource = new BehaviorSubject<Card[]>([]);
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

  private playerPoints: number;
  private dealerPoints: number;

  private static recalculatePoints(hand: Card[]): number {
    console.log(hand);
    let aceCost = 11;
    let sum = hand.reduce((previousValue, currentValue) => {
      return previousValue + (currentValue.value === 'ACE' ? aceCost : GameDataService.points[currentValue.value]);
    }, 0);

    if (sum > 21) {
      aceCost = 1;
      sum = hand.reduce((previousValue, currentValue) => {
        return previousValue + (currentValue.value === 'ACE' ? aceCost : GameDataService.points[currentValue.value]);
      }, 0);
    }

    return sum;
  }

  private static generatePointsMessage(amount: number): string {
    if (amount % 10 === 1 && amount !== 11) {
      return amount.toString() + ' очко';
    } else if ((amount % 10 === 2
              || amount % 10 === 3
              || amount % 10 === 4)
              && !(amount === 12
              || amount === 13
              || amount === 14)) {
      return amount.toString() + ' очка';
    } else {
      return amount.toString() + ' очков';
    }
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
    this.deckApiService.reshuffleDeck().subscribe();

    this.betSource.next(0);

    this.playerHandSource.next([]);
    this.dealerHandSource.next([]);

    this.showChipsSource.next(true);
    this.messageSource.next('Сделайте вашу ставку');

    this.buttonsSource.next([
      {
        buttonName: 'Раздавай!',
        eventType: 'start_dealing',
        disabled: true
      }
    ]);
  }

  startDealing() {
    this.showChipsSource.next(false);

    this.deckApiService.drawCards(4).subscribe(cards => {
      this.dealerHandSource.value.push(cards[0]);
      this.dealerHandSource.value.push(cards[1]);
      this.playerHandSource.value.push(cards[2]);
      this.playerHandSource.value.push(cards[3]);
    });

    this.playerPoints = GameDataService.recalculatePoints(this.playerHandSource.value);
    this.dealerPoints = GameDataService.recalculatePoints(this.dealerHandSource.value);

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
    this.deckApiService.drawCards().subscribe(
      cards => {
        this.playerHandSource.value.push(cards[0]);
        this.playerPoints = GameDataService.recalculatePoints(this.playerHandSource.value);
        if (this.playerPoints < 21) {
          this.messageSource.next('Вы собрали ' + GameDataService.generatePointsMessage(this.playerPoints));
        } else if (this.playerPoints === 21) {
          this.blackJack();
        } else {
          this.tooMuch();
        }
      }
    );
  }

  blackJack() {
    this.messageSource.next('Вы собрали блекджек! Ещё одну?');

    this.buttonsSource.next([
      {
        buttonName: 'Давай!',
        eventType: 'game_start'
      }
    ]);
  }

  tooMuch() {
    this.messageSource.next('Упс, перебор. Сыграем ещё?');

    this.buttonsSource.next([
      {
        buttonName: 'Давай!',
        eventType: 'game_start'
      }
    ]);
  }

  stopDrawing() {
    this.clearHand(this.playerHandSource.value);
  }

  clearHand(hand: Card[]) {
    hand.pop();
    if (hand.length > 0) {
      setTimeout(() => this.clearHand(hand), 100);
    }
  }

  makeBet(amount: number) {
    if (this.balanceSource.value - amount >= 0) {
      this.balanceSource.next(this.balanceSource.value - amount);
      this.betSource.next(this.betSource.value + amount);
      this.buttonsSource.value[0].disabled = false;
    } else {
      console.log('Whoops! Something went wrong');
    }
  }
}
