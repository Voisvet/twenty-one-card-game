import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chips-controls',
  templateUrl: './chips-controls.component.html',
  styleUrls: ['./chips-controls.component.css']
})
export class ChipsControlsComponent implements OnInit {

  @Input() bet: (amount: number) => void;
  @Input() balance: number;

  constructor() { }

  ngOnInit() {
  }

}
