import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'razonsocialDataFilter'
})
export class RazonsocialFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.razonsocial.indexOf(query) > -1);
        }
        return array;
    }
}
