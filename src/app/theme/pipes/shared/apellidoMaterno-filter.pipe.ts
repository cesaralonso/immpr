import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'apellidoMaternoDataFilter'
})
export class ApellidoMaternoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.apellidoMaterno.indexOf(query) > -1);
        }
        return array;
    }
}
