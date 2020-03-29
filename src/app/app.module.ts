import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Venues } from './views/venues/venues.view';
import { Venue } from './views/venue-detail/venue-detail.view';
import { InteractiveTable } from './components/interactive-table.component';
import { TableFilter } from './components/table-filter.component';
import { TableInputFilter } from './components/table-input-filter.component';
import { TableSelectFilter } from './components/table-select-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    Venues,
    Venue,
    InteractiveTable,
    TableFilter,
    TableInputFilter,
    TableSelectFilter,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
