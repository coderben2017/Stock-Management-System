import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stock: Stock;

  formModel: FormGroup;

  categories = ['IT', '互联网', '金融', '文化'];

  constructor(private routeInfo: ActivatedRoute, private stockService: StockService, private route: Router) { }

  ngOnInit() {
    let stockId: number = this.routeInfo.snapshot.params['id'];
    this.stock = this.stockService.getStock(stockId);

    /* 响应式表单 */
    let fb = new FormBuilder();
    this.formModel = fb.group({
      name: [this.stock.name, [Validators.required, Validators.minLength(1)]],
      price: [this.stock.price, Validators.required],
      description: [this.stock.description],
      categories: fb.array([
        new FormControl(this.stock.categories.indexOf(this.categories[0]) > -1),
        new FormControl(this.stock.categories.indexOf(this.categories[1]) > -1),
        new FormControl(this.stock.categories.indexOf(this.categories[2]) > -1),
        new FormControl(this.stock.categories.indexOf(this.categories[3]) > -1)
      ], this.categoriesSelectorValidator)
    });
  }

  categoriesSelectorValidator(inControl: FormArray) {
    let valid = false;
    inControl.controls.forEach(control => {
      if (control.value) { // 有1个类型就合法
        valid = true;
      }
    });
    if (valid) {
      return null; // length检查通过
    } else {
      return {categoriesLength: true}; // length检查不合法
    }
  }

  returnStockList(): void {
    this.route.navigateByUrl('/stock');
  }

  save(): void {
    /* code here */
    let chineseCategories = [];
    let index = 0;
    for (let i = 0; i < 4; ++i) {
      if (this.formModel.value.categories[i]) {
        chineseCategories[index++] = this.categories[i];
      }
    }

    this.formModel.value.rating = this.stock.rating;
    console.log(this.formModel.value);

    this.returnStockList();
  }

}
