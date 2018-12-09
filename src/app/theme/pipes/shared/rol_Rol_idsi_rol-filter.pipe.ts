import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'rol_Rol_idsi_rolDataFilter'
})
export class Rol_Rol_idsi_rolFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.si_rol_Rol_idsi_rol.indexOf(query) > -1);
        }
        return array;
    }
}
