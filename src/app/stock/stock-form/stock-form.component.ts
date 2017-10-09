import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stock: Stock = new Stock(0, '', 0, 0, '', []);

  formModel: FormGroup;

  categories = ['IT', '互联网', '金融', '文化'];

  constructor(private routeInfo: ActivatedRoute, private stockService: StockService, private route: Router) { }

  ngOnInit() {
    let stockId: number = this.routeInfo.snapshot.params['id'];

    /* 响应式表单 */
    let fb = new FormBuilder();
    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', Validators.required],
      description: [''],
      categories: fb.array([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ], this.categoriesSelectorValidator)
    });

    this.stockService.getStock(stockId).subscribe(
      data => {
        this.stock = data;
        this.formModel.reset({
          name: data.name,
          price: data.price,
          description: data.description,
          categories: [
            data.categories.indexOf(this.categories[0]) > -1,
            data.categories.indexOf(this.categories[1]) > -1,
            data.categories.indexOf(this.categories[2]) > -1,
            data.categories.indexOf(this.categories[3]) > -1,
          ]
        });
      }
    );
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
