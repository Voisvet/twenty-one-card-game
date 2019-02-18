import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameDataService} from '../game-data.service';
import {Subscription} from 'rxjs';

export interface ControlButton {
  buttonName: string;
  eventType: string;
}

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.css']
})
export class ControlButtonsComponent implements OnInit, OnDestroy {

  buttonsList: ControlButton[];
  subscription: Subscription;

  constructor(private gameDataService: GameDataService) {
    this.subscription = gameDataService.buttons.subscribe(value => this.buttonsList = value);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onButtonClick(eventType: string) {
    this.gameDataService.buttonClickHandler(eventType);
  }

}
