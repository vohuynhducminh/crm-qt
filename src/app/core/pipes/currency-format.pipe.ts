import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(
    value: number,
    discardZero: boolean = false,
    thousandsSeparatorSymbol: string = '.',
    decimalsSeparatorSymbol: string = ','
  ): any {
    if (value === 0 && discardZero) {
      return null;
    }
    const valueStr = `${value}`;
    const valueArr = valueStr.split('.');
    let thousands = valueArr[0];
    let result = '';
    while (thousands.length > 3) {
        const next = thousands.substr(thousands.length - 3);
        thousands = thousands.substr(0, thousands.length - 3);
        result = `${thousandsSeparatorSymbol}${next}${result}`;
    }
    result = `${thousands}${result}`;
    if (valueArr.length === 2) {
      result = `${result}${decimalsSeparatorSymbol}${valueArr[1]}`;
    }
    return result;
  }

}
