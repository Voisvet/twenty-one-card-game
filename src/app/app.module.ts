import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {ControlButtonsComponent} from './control-buttons/control-buttons.component';
import {ChipsControlsComponent} from './chips-controls/chips-controls.component';
import {HandComponent} from './hand/hand.component';
import {GameDataService} from './game-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ControlButtonsComponent,
    ChipsControlsComponent,
    HandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
