import { Component, Input, Output, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
import { Sort, SortOrder } from '../api-mock/api';

export type Column = {
  path: string;
  label: string;
  sortable?: boolean;
}
@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.component.scss']
})
export class InteractiveTableComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() columns: Array<Column> = [];
  @Input() isLoading = false;
  @Input() pageIndex = 0;
  @Input() pageSize = 25;
  @Input() length = 0;
  @Input() pageSizeOptions: Array<number> = [10, 25, 50, 100];
  @Input() showFirstLastButtons = true;
  @Input() filters = []
  @Input() sort: Sort;

  @Output() paginationChange = new EventEmitter();

  pageEvent: PageEvent;
  dataSource: MatTableDataSource<any>;
  columnsDefinition: string[]

  createDataSource() {
    this.dataSource = new MatTableDataSource(this.data)
    this.columnsDefinition = this.columns.map(({ path }) => path)
  }

  ngOnInit() {
    this.createDataSource()
  }

  ngOnChanges() {
    this.createDataSource()
  }

  handleSort({ path }) {
    let order = SortOrder.asc;
    if (path === this.sort.path) {
      if (this.sort.order === 0) {
        order = SortOrder.desc
      }
      if (this.sort.order === 1) {
        order = undefined
      }
    } else {
      order = 0
    }
    this.pageIndex = 0;
    this.paginationChange.emit({
      pagination: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        length: this.length
      },
      filters: this.filters,
      sort: {
        path: order === undefined ? undefined : path,
        order
      }
    })
  }

  filterChange(filters) {
    this.pageIndex = 0
    this.paginationChange.emit({
      pagination: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        length: this.length
      }, filters, sort: this.sort
    })
  }

  handlePagination(event?: PageEvent) {
    if (this.paginationChange) {
      this.paginationChange.emit({ pagination: event, filters: this.filters, sort: this.sort })
    }
    return event
  }
}

