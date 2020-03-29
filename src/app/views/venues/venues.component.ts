import { Component, OnInit } from '@angular/core';
import { getVenues, SortOrder, Sort } from '../../api-mock/api';
import { Column } from 'src/app/components/interactive-table.component';

interface VenueItem {
  trcid: string;
  title: string;
}

@Component({
  selector: 'app-venues-component',
  templateUrl: './venues.component.html',
})
export class VenuesComponent implements OnInit {
  venuesList: Array<VenueItem> = [];
  columns: Array<Column> = [
    { path: 'trcid', label: 'Id', sortable: true },
    { path: 'title', label: 'Title' },
    { path: 'location.city', label: 'City', sortable: true }
  ];
  isLoading = true;
  filters = [
    { key: 'title', filterType: 'input', label: 'Title' },
    { key: 'location.city', filterType: 'select', label: 'City', options: [{ value: 'amsterdam', label: 'Amsterdam' }, { value: 'AALSMEER', label: 'Aalsmeer' }] }
  ];
  count = 0;
  limit = 25;
  offset = 0;
  pageIndex = 1;
  sort: Sort = {
    path: 'trcid',
    order: SortOrder.asc
  };

  handleVenuesRequest = ({ pagination, sort, filters = [] }) => {
    this.isLoading = true;
    getVenues({
      limit: pagination.pageSize,
      offset: pagination.pageSize * pagination.pageIndex,
      sort,
      filters: filters.map(({ key, filterValue }) => ({
        filterPath: key,
        filterValue: filterValue || ''
      })
      )
    }).then(({ data, count, limit, offset }) => {
      this.count = count;
      this.limit = limit;
      this.offset = offset;
      this.pageIndex = Math.ceil(offset / (limit + 1))
      this.venuesList = data.map(({ trcid, title, location: { city } }) => ({ trcid, title, ['location.city']: city, link: `/venues/${trcid}` }))
      this.isLoading = true
    })
  }

  ngOnInit() {
    this.handleVenuesRequest({
      pagination: {
        pageSize: this.limit,
        pageIndex: 1
      }, sort: this.sort, filters: []
    })
  }

  venuesPagination({ pagination, filters, sort }) {
    this.filters = filters;
    this.sort = sort;
    this.handleVenuesRequest({ pagination, sort, filters })
  }
}
