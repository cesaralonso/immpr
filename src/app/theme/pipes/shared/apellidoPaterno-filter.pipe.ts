import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'apellidoPaternoDataFilter'
})
export class ApellidoPaternoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.apellidoPaterno.indexOf(query) > -1);
        }
        return array;
    }
}
