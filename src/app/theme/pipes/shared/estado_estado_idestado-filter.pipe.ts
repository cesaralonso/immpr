import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'estado_estado_idestadoDataFilter'
})
export class Estado_estado_idestadoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.estado_estado_idestado.indexOf(query) > -1);
        }
        return array;
    }
}
