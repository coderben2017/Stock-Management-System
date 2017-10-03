import { Injectable } from '@angular/core';

@Injectable()
export class StockService {

  constructor() { }

  private stocks = [
    new Stock(1, "腾讯", 66, 5.0, "腾讯集团", ["IT", "互联网", "文化"]),
    new Stock(2, "阿里", 64, 5.0, "阿里巴巴集团", ["IT", "互联网", "金融"]),
    new Stock(3, "百度", 58, 4.6, "百度公司", ["IT", "互联网"]),
    new Stock(4, "京东", 56, 4.5, "京东公司", ["互联网", "金融"]),
    new Stock(5, "网易", 56, 4.5, "网易公司", ["互联网"]),
    new Stock(6, "滴滴", 54, 3.9, "滴滴公司", ["互联网"]),
    new Stock(7, "美团点评", 54, 3.5, "新美大集团", ["互联网"]),
    new Stock(8, "爱奇艺", 48, 2.9, "爱奇艺公司", ["互联网", "文化"]),
    new Stock(9, "今日头条", 52, 3.5, "字节跳动公司", ["互联网", "文化"]),
  ];

  getStocks(): Stock[] {
    return this.stocks;
  }

  getStock(id: number): Stock {
    let stock = this.stocks.find(stock => stock.id == id);
    if (!stock) {
      stock = new Stock(0, '', 0, 0, '', ['']);
    }
    return stock;
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
