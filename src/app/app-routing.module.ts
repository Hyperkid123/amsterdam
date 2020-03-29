import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenuesComponent } from './views/venues/venues.component';
import { VenueComponent } from './views/venue-detail/venue-detail.component';


const routes: Routes = [
  { path: '', component: VenuesComponent },
  { path: 'venues/:venueId', component: VenueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
