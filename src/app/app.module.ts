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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VenuesComponent } from './views/venues/venues.component';
import { VenueComponent } from './views/venue-detail/venue-detail.component';
import { InteractiveTableComponent } from './components/interactive-table.component';
import { TableFilterComponent } from './components/table-filter.component';
import { TableInputFilterComponent } from './components/table-input-filter.component';
import { TableSelectFilterComponent } from './components/table-select-filter.component';
import { VenueMapComponent } from './components/venue-map.component';

@NgModule({
  declarations: [
    AppComponent,
    VenuesComponent,
    VenueComponent,
    InteractiveTableComponent,
    TableFilterComponent,
    TableInputFilterComponent,
    TableSelectFilterComponent,
    VenueMapComponent
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
    MatInputModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
