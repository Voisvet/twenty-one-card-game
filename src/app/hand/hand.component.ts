import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../deck-api.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  @Input() cards: Card[];
  @Input() isFirstCardShown: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  getOffsetOfCard(i: number): string {
    const baseWidth = window.matchMedia('(max-width: 480px)') ? 50 : 60;
    return '-' + (i * baseWidth) + 'px';
  }

  getHandWidth(): string {
    if (this.cards) {
      const baseWidth = window.matchMedia('(max-width: 480px)') ? 50 : 60;
      return '' + (this.cards.length * baseWidth + baseWidth) + 'px';
    } else {
      return '1px';
    }
  }
}
