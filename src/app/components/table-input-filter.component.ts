import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableFilter } from './table-filter.component';


@Component({
  selector: 'app-table-input-filter',
  templateUrl: './table-input-filter.component.html',
})
export class TableInputFilterComponent {
  @Input() filter: TableFilter;
  @Input() index: number;

  @Output() filterChange = new EventEmitter();

  handleFilterChange(value) {
    this.filterChange.emit({ ...this.filter, filterValue: this.filter.substring ? value : value.length > 0 ? value : undefined })
  }
}