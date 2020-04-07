import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appEnum'
})
export class AppEnumPipe implements PipeTransform {

  transform(value: any, args: Array<any>): any {
    if (args) {
      if (args.filter(x => x.value === value).length > 0) {
        return args.filter(x => x.value === value)[0].description;
      } else {
        return 'N/A';
      }
    } else {
      return 'N/A';
    }
  }

}

export class AppEnumPipeArg {
  description: string;
  value: string;
}
