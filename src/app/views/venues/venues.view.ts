import { Component, OnInit, OnChanges } from '@angular/core';
import { getVenues, EstablishmentItem, SortOrder } from '../../api-mock/api';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

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
  columns: string[] = ['trcid', 'title', 'city'];
  isLoading: boolean = true;
  filters = [
    {key: 'title', filterType: 'input', label: 'Title'},
    {key: 'location.city', filterType: 'select', label: 'City', options: [{value: 'amsterdam', label: 'Amsterdam'}, {value: 'AALSMEER', label: 'Aalsmeer'}]}
  ];
  count: number = 0;
  limit: number = 25;
  offset: number = 0;
  pageIndex: number = 1;

  ngOnInit() {
    this.isLoading = true;
    getVenues().then(({data, count, limit, offset}) => {
      this.count = count;
      this.limit = limit;
      this.offset = offset;
      this.pageIndex = Math.ceil(offset / (limit + 1))
      this.venuesList = new MatTableDataSource<VenueItem>(data.map(({ trcid, title, location: {city} }) => ({trcid, title, city})))
      this.isLoading = true
    })
  }

  venuesPagination({pagination, filters}): PageEvent {
    this.filters = filters;
    this.isLoading = true;
    getVenues({
      limit: pagination.pageSize,
      offset: pagination.pageSize * pagination.pageIndex,
      filters: filters.map(({ key, filterValue }) => ({
        filterPath: key,
        filterValue: filterValue || ''
      })
    )}).then(({data, count, limit, offset}) => {
      this.count = count;
      this.limit = limit;
      this.offset = offset;
      this.pageIndex = Math.ceil(offset / (limit + 1))
      this.venuesList = new MatTableDataSource<VenueItem>(data.map(({ trcid, title, location: {city} }) => ({trcid, title, city})))
      this.isLoading = true
    })
    return pagination;
  }
}
