import {Component} from '@angular/core';
import {GameDataService} from './game-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isGameStarted: boolean;

  constructor(private gameDataService: GameDataService) {
    this.gameDataService.isGameStarted.subscribe(value => this.isGameStarted = value);
  }
}
