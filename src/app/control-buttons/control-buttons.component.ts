import {Component, Input, OnInit} from '@angular/core';

interface ControlButton {
  buttonName: string;
  handler: () => void;
}

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.css']
})
export class ControlButtonsComponent implements OnInit {

  @Input() buttonsList: [ControlButton];

  constructor() { }

  ngOnInit() {
  }

}
