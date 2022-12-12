import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent implements OnInit {

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 12;

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(sort: string): void {
    this.sort = sort;
    this.sortChange.emit(sort);
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(columns: number): void {
    this.columnsCountChange.emit(columns);
  }

}
