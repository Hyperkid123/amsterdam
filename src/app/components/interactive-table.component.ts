import { Component, Input, Output, ViewChild, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
import { Sort, SortOrder } from '../api-mock/api';

export type Column = {
  path: string;
  label: String;
}
@Component({
  selector: 'interactive-table',
  templateUrl: './interactive-table.component.html',
})
export class InteractiveTable implements OnInit, OnChanges {
  @Input() data = [];
  @Input() columns: Array<Column> = [];
  @Input() isLoading: boolean = false;
  @Input() pageIndex:number = 0;
  @Input() pageSize:number = 25;
  @Input() length:number = 0;
  @Input() pageSizeOptions: Array<number> = [10, 25, 50, 100];
  @Input() showFirstLastButtons: boolean = true;
  @Input() filters = []
  @Input() sort: Sort;

  @Output() paginationChange = new EventEmitter();

  pageEvent: PageEvent;
  dataSource: MatTableDataSource<any>;
  columnsDefinition: string[]

  createDataSource() {
    this.dataSource = new MatTableDataSource(this.data)
    this.columnsDefinition = this.columns.map(({path}) => path)
  }

  ngOnInit() {
    this.createDataSource()
  }

  ngOnChanges() {
    this.createDataSource()
  }

  handleSort({path}) {
    let order = SortOrder.asc;
    if(this.sort.order === 0) {
      order = SortOrder.desc
    }
    if(this.sort.order === 1) {
      order = undefined
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
    this.paginationChange.emit({pagination: {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    }, filters, sort: this.sort})
  }

  handlePagination(event?: PageEvent) {
    if(this.paginationChange) {
      this.paginationChange.emit({pagination: event, filters: this.filters, sort: this.sort})
    }
    return event
  }
}

