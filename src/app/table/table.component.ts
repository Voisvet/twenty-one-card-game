import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameDataService} from '../game-data.service';
import {Subscription} from 'rxjs';
import {Card} from '../deck-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  playerHand: Card[];
  dealerHand: Card[];
  firstDealerCardShown: boolean;
  message: string;
  subscriptions: Subscription[] = [];

  constructor(private gameDataService: GameDataService) {
    this.subscriptions.push(
      this.gameDataService.message.subscribe(value => this.message = value)
    );
    this.subscriptions.push(
      this.gameDataService.dealerHand.subscribe(value => this.dealerHand = value)
    );
    this.subscriptions.push(
      this.gameDataService.showFirstDealerCard.subscribe(value => this.firstDealerCardShown = value)
    );
    this.subscriptions.push(
      this.gameDataService.playerHand.subscribe(value => this.playerHand = value)
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
