import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stock: Stock;

  constructor(private routeInfo: ActivatedRoute, private stockService: StockService, private route: Router) { }

  ngOnInit() {
    let stockId: number = this.routeInfo.snapshot.params['id'];
    this.stock = this.stockService.getStock(stockId);
  }

  returnStockList(): void {
    this.route.navigateByUrl('/stock');
  }

  save(): void {
    this.returnStockList();
  }

}
