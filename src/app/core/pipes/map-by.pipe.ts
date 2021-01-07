import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapBy',
})
export class MapByPipe implements PipeTransform {

  transform(
    value: any,
    parent: any[],
    matchedProp: string = 'Id',
    resultProp: string = 'Name'
  ): any {
    let result: any = null;
    if (parent && parent.length > 0) {
      const pilot = parent.find(e => e.hasOwnProperty(matchedProp) && e[matchedProp] === value);
      if (pilot) {
        result = pilot[resultProp];
      }
    }
    return result;
  }

}
