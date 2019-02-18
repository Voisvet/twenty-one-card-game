import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameDataService} from '../game-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chips-controls',
  templateUrl: './chips-controls.component.html',
  styleUrls: ['./chips-controls.component.css']
})
export class ChipsControlsComponent implements OnInit, OnDestroy {

  balance: number;
  bet: number;
  areChipsShown: boolean;
  subscriptions: Subscription[] = [];

  constructor(private gameDataService: GameDataService) {
    this.subscriptions.push(
      gameDataService.balance.subscribe(value => this.balance = value)
    );
    this.subscriptions.push(
      gameDataService.bet.subscribe(value => this.bet = value)
    );
    this.subscriptions.push(
      gameDataService.showChips.subscribe(value => this.areChipsShown = value)
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onChipClick(amount: number) {
    this.gameDataService.makeBet(amount);
  }

}
