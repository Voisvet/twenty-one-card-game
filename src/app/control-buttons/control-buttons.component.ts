import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface ControlButton {
  buttonName: string;
  eventType: string;
}

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.css']
})
export class ControlButtonsComponent implements OnInit {

  @Input() buttonsList: [ControlButton];

  @Output() buttonClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onButtonClick(eventType: string) {
    this.buttonClick.emit(eventType);
  }

}
