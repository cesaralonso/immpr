import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sexoDataFilter'
})
export class SexoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.sexo.indexOf(query) > -1);
        }
        return array;
    }
}
