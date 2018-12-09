import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'extraPorDataFilter'
})
export class ExtraPorFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.extraPor.indexOf(query) > -1);
        }
        return array;
    }
}
