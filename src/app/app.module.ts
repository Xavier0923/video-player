import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [DatePipe, TimePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
