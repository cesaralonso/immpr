import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'empleadotarea_empleadotarea_idempleadotareaDataFilter'
})
export class Empleadotarea_empleadotarea_idempleadotareaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.empleadotarea_empleadotarea_idempleadotarea.indexOf(query) > -1);
        }
        return array;
    }
}
