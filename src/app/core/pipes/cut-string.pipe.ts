import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutString',
})
export class CutStringPipe implements PipeTransform {

  transform(value: string, len?: number): string {
    let result = value;
    const strLen = value ? value.length : 0;
    if (strLen > len) {
      result = value.substring(0, len - 4) + ' ...';
    }
    return result;
  }

}
