import { Component, OnInit, OnChanges } from '@angular/core';
import { getData } from '../../api-mock/api';
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
  columns: string[] = ['trcid', 'title']
  ngOnInit() {
    getData().then(data => {
      this.venuesList = new MatTableDataSource<VenueItem>(data.map(({ trcid, title }) => ({trcid, title})))
    })
  }
}
