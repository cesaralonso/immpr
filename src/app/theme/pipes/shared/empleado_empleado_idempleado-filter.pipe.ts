import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'empleado_empleado_idempleadoDataFilter'
})
export class Empleado_empleado_idempleadoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.empleado_empleado_idempleado.indexOf(query) > -1);
        }
        return array;
    }
}
