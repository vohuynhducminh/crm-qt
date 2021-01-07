import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonArray',
})
export class JsonArrayPipe implements PipeTransform {

  transform(value: string, divider: string = '', pattern: string = '$'): any {
    let result = value;
    try {
      const arr = JSON.parse(value);
      result = arr;
      if (arr && Array.isArray(arr)) {
        result = arr.map(e => pattern.split('$').join(e)).join(divider);
      }
    } catch (e) {
    }
    return result;
  }

}
