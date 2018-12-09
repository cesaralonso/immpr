import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'tarea_tarea_idtareaDataFilter'
})
export class Tarea_tarea_idtareaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.tarea_tarea_idtarea.indexOf(query) > -1);
        }
        return array;
    }
}
