import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'interactive-table',
  templateUrl: './interactive-table.component.html',
})
export class InteractiveTable implements OnChanges {
  @Input() dataSource = new MatTableDataSource([]);
  @Input() columns: string[] = [];
  constructor() {
  }
  ngOnChanges() {
  }
}

