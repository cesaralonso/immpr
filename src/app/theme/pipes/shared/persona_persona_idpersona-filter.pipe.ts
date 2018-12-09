import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'persona_persona_idpersonaDataFilter'
})
export class Persona_persona_idpersonaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.persona_persona_idpersona.indexOf(query) > -1);
        }
        return array;
    }
}
