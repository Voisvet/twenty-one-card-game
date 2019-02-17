import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chips-controls',
  templateUrl: './chips-controls.component.html',
  styleUrls: ['./chips-controls.component.css']
})
export class ChipsControlsComponent implements OnInit {

  @Input() balance: number;
  @Input() bet: number;
  @Input() areChipsShown: boolean;

  @Output() makeBet = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onChipClick(amount: number) {
    this.makeBet.emit(amount);
  }

}
