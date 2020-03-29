import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export enum filterTypes {
  input,
  select
}

export type filterValue = string | number | boolean | Array<string> | Array<number> | Array<boolean>

export interface filterOption {
  value: string | number | boolean;
  label: string;
}

export type filterOptions = Array<filterOption>

export interface TableFilter {
  key: string;
  filterType: filterTypes;
  label: string;
  filterValue?: filterValue;
  filterOptions?: filterOptions;
}

export type TableFilters = Array<TableFilter>

@Component({
  selector: 'table-filter',
  templateUrl: './table-filter.component.html',
})
export class TableFilter {
  @Input() filters: TableFilters = []
  @Output() filterChange = new EventEmitter()

  handleFilter(event) {
    this.filterChange.emit(this.filters.map(filter => filter.key === event.key ? ({
      ...filter,
      ...event
    }) : filter))
  }
}

