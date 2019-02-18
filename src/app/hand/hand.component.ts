import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  @Input() cards: string[];
  @Input() isFirstCardShown: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  getOffsetOfCard(i: number): string {
    return '-' + (i * 60) + 'px';
  }

  getHandWidth(): string {
    if (this.cards) {
      return '' + (this.cards.length * 60 + 60) + 'px';
    } else {
      return '1px';
    }
  }
}
