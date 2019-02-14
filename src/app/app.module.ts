import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ControlButtonsComponent } from './control-buttons/control-buttons.component';
import { ChipsControlsComponent } from './chips-controls/chips-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ControlButtonsComponent,
    ChipsControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
