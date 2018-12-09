export interface OrdentareasInterface {
   idordentarea?: number;
   tarea_idtarea?: number;
   ordenproducto_idordenproducto?: number;
   especificaciones?: string;
   fechaInicio?: string;
   horaInicio?: string;
   fechaTermina?: string;
   horaTermina?: string;
   fechaEstimada?: string;
   horaEstimada?: string;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
