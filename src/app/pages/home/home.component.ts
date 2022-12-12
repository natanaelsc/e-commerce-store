import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 2: 335, 3: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = 12;
  productsSubscription: Subscription | undefined

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      }
    )
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onItemsCountChange(count: number): void {
    this.count = count;
    this.getProducts();
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.getProducts();
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

  ngOnDetroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

}
