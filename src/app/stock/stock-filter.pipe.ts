import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockFilter'
})
export class StockFilterPipe implements PipeTransform {

  transform(list: any[], field: string, keyWord: string): any {
    if (!field || !keyWord) {
      return list;
    }
    return list.filter(item => {
      const itemFieldValue: any = item[field].toLowerCase();
      return itemFieldValue.indexOf(keyWord) >= 0;
    });
  }

}
