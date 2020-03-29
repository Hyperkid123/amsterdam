import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TableFilter } from './table-filter.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'table-select-filter',
  templateUrl: './table-select-filter.component.html',
})
export class TableSelectFilter implements OnInit {
  @Input() filter: TableFilter;
  @Input() index: number;
  @Input() options = []

  @Output() filterChange = new EventEmitter();  
  filterControl = new FormControl();
  
  ngOnInit() {
    this.filterControl.setValue(this.filter.filterValue || [])
    this.filterControl.valueChanges.subscribe(value => {  
      this.filter.filterValue = value.length > 0 ? value : undefined;
      this.filterChange.emit(this.filter)
    })
  }
}