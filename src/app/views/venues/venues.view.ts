import { Component, OnInit, OnChanges } from '@angular/core';
import { getVenues, EstablishmentItem, SortOrder } from '../../api-mock/api';
import { MatTableDataSource } from '@angular/material/table';

interface VenueItem {
  trcid: string;
  title: string;
}

@Component({
  selector: 'venues',
  templateUrl: './venues.view.html',
})
export class Venues implements OnInit {
  venuesList =  new MatTableDataSource<VenueItem>([]);
  columns: string[] = ['trcid', 'title', 'city']
  ngOnInit() {
    getVenues({sort: {
      path: 'location.city',
      order: SortOrder.asc
    },filters: [{
      filterPath: 'title',
      filterValue: 'a'
    }, {
      filterPath: 'location.city',
      filterValue: 'i'
    }]}).then((data: Array<EstablishmentItem>) => {
      this.venuesList = new MatTableDataSource<VenueItem>(data.map(({ trcid, title, location: {city} }) => ({trcid, title, city})))
    })
  }
}
