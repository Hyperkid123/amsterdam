import { Component, OnInit, OnChanges } from '@angular/core';
import { getVenues, EstablishmentItem, SortOrder, Sort } from '../../api-mock/api';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Column } from 'src/app/components/interactive-table.component';

interface VenueItem {
  trcid: string;
  title: string;
}

@Component({
  selector: 'venues',
  templateUrl: './venues.view.html',
})
export class Venues implements OnInit {
  venuesList: Array<VenueItem> = [];
  columns: Array<Column> = [{path: 'trcid', label: 'Id'}, {path: 'title', label: 'Title'}, {path: 'location.city', label: 'City'}];
  isLoading: boolean = true;
  filters = [
    {key: 'title', filterType: 'input', label: 'Title'},
    {key: 'location.city', filterType: 'select', label: 'City', options: [{value: 'amsterdam', label: 'Amsterdam'}, {value: 'AALSMEER', label: 'Aalsmeer'}]}
  ];
  count: number = 0;
  limit: number = 25;
  offset: number = 0;
  pageIndex: number = 1;
  sort: Sort = {
    path: 'trcid',
    order: SortOrder.asc
  };

  ngOnInit() {
    this.isLoading = true;
    getVenues({sort: {
      path: this.sort.path,
      
    }}).then(({data, count, limit, offset}) => {
      this.count = count;
      this.limit = limit;
      this.offset = offset;
      this.pageIndex = Math.ceil(offset / (limit + 1))
      this.venuesList = data.map(({ trcid, title, location: {city} }) => ({trcid, title, ['location.city']: city, link: `/venues/${trcid}`}))
      this.isLoading = true
    })
  }

  venuesPagination({pagination, filters, sort}): PageEvent {
    this.filters = filters;
    this.isLoading = true;
    this.sort = sort;
    getVenues({
      limit: pagination.pageSize,
      offset: pagination.pageSize * pagination.pageIndex,
      sort,
      filters: filters.map(({ key, filterValue }) => ({
        filterPath: key,
        filterValue: filterValue || ''
      })
    )}).then(({data, count, limit, offset}) => {
      this.count = count;
      this.limit = limit;
      this.offset = offset;
      this.pageIndex = Math.ceil(offset / (limit + 1))
      this.venuesList = data.map(({ trcid, title, location: {city} }) => ({trcid, title, ['location.city']: city, link: `/venues/${trcid}`}))
      this.isLoading = true
    })
    return pagination;
  }
}
