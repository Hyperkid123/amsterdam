import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Venues } from './views/venues/venues.view';
import { Venue } from './views/venue-detail/venue-detail.view';


const routes: Routes = [
  {path: '', component: Venues},
  {path: 'venues/:venueId', component: Venue}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
