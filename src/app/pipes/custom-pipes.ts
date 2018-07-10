import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";





@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value: ValidationErrors, args: string[]): any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }

    return keys;
  }

}