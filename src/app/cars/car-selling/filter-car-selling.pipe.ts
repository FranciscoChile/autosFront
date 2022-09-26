import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCarSelling'
})
export class FilterCarSellingPipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    if (Object.keys(filter).length == 0) return items;
    //console.log(filter);

    let filterKeys = Object.keys(filter);

    if (filter['priceFrom'] != null) {
      items = items.filter(v => v['price'] >= filter['priceFrom']);
    } 

    if (filter['priceTo'] != null) {
      items = items.filter(v => v['price'] <= filter['priceTo']);
    } 

    if (filter['priceFrom'] != null || filter['priceTo'] != null) {
      return items;
    }

    if (filter['yearFrom'] != null) {
      items = items.filter(v => v['year'] >= filter['yearFrom']);
    } 

    if (filter['yearTo'] != null) {
      items = items.filter(v => v['year'] <= filter['yearTo']);
    } 

    if (filter['yearFrom'] != null || filter['yearTo'] != null) {
      return items;
    }

    return items.filter(item => {
      return filterKeys.every(keyName => {
        // console.log(keyName);
        return (
          new RegExp(filter[keyName], 'gi').test(item[keyName]) ||
          filter[keyName] === ''
        );
      });
    });
    
  }
}
