import { Component, OnInit } from '@angular/core';
import { getVenues, getCities, SortOrder, Sort } from '../../api-mock/api';
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
    { path: 'title', label: 'Name', sortable: true },
    { path: 'location.city', label: 'City', sortable: true },
    { path: 'location.zipcode', label: 'Postcode', sortable: true },
    { path: 'location.adress', label: 'Adress', sortable: true },
    { path: 'dates.startdate', label: 'Start year', sortable: true }
  ];
  isLoading = true;
  filters = [
    { key: 'title', filterType: 'input', label: 'name', substring: true },
    { key: 'location.city', filterType: 'select', label: 'City', options: [{ value: 'amsterdam', label: 'Amsterdam' }, { value: 'AALSMEER', label: 'Aalsmeer' }] },
    { key: 'dates.startdate', filterType: 'input', label: 'Start year' },
    { key: 'location.zipcode', filterType: 'input', label: 'Postcode' },
  ];
  count = 0;
  limit = 25;
  offset = 0;
  pageIndex = 1;
  sort: Sort = {
    path: 'trcid',
    order: SortOrder.asc
  };
  locations: any = [];

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
      this.venuesList = data.map(({ trcid, title, location: { city, zipcode, adress, ...location }, dates: { startdate }, details: {en: {shortdescription}} }) =>
        ({
          trcid,
          title,
          ['location.city']: city,
          ['location.adress']: adress,
          ['location.zipcode']: zipcode,
          ['dates.startdate']: startdate && startdate.split('-').pop(),
          link: `/venues/${trcid}`,
          location,
          shortdescription
        }))
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
    getCities().then((cities) => {
      this.filters = this.filters.map(
        (filter: any) => filter.key === 'location.city'
        ? ({...filter, options: cities.map(city => ({value: city, label: city}))})
        : filter
      ) 
    });
  }

  venuesPagination({ pagination, filters, sort }) {
    this.filters = filters;
    this.sort = sort;
    this.handleVenuesRequest({ pagination, sort, filters })
  }
}
