import { Component, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'interactive-table',
  templateUrl: './interactive-table.component.html',
})
export class InteractiveTable {
  @Input() dataSource = new MatTableDataSource([]);
  @Input() columns: string[] = [];
  @Input() isLoading: boolean = false;
  @Input() pageIndex:number = 0;
  @Input() pageSize:number = 25;
  @Input() length:number = 0;
  @Input() pageSizeOptions: Array<number> = [10, 25, 50, 100];
  @Input() showFirstLastButtons: boolean = true;
  @Input() filters = []

  @Output() paginationChange = new EventEmitter();

  pageEvent: PageEvent;

  filterChange(filters) {
    this.pageIndex = 0
    this.paginationChange.emit({pagination: {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    }, filters})
  }

  handlePagination(event?: PageEvent) {
    if(this.paginationChange) {
      this.paginationChange.emit({pagination: event, filters: this.filters})
    }
    return event
  }
}

