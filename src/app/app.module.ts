import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table' 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Venues } from './views/venues/venues.view';
import { Venue } from './views/venue-detail/venue-detail.view';
import { InteractiveTable } from './components/interactive-table.component';

@NgModule({
  declarations: [
    AppComponent,
    Venues,
    Venue,
    InteractiveTable
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
