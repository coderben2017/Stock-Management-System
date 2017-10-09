import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockService {

  constructor(public http: Http) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get('/api/stock').map(result => result.json());
  }

  getStock(id: number): Observable<Stock> {
    return this.http.get(`/api/stock/${id}`).map(result => result.json());
  }

}

export class Stock {

  constructor(
    public id: number,
    public name: string,
    public price: number,
    public rating: number,
    public description: string,
    public categories: Array<string>
  ) { }

}
