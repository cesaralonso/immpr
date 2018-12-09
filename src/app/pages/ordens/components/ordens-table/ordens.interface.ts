export interface OrdensInterface {
   idorden?: number;
   cliente_idcliente?: number;
   fecha?: string;
   hora?: string;
   fechaEntregaEstimada?: string;
   horaEntregaEstimada?: string;
   fechaEntregaReal?: string;
   horaEntregaReal?: string;
   fechaInicioEstimada?: string;
   horaInicioEstimada?: string;
   subtotal?: number;
   total?: number;
   cubierto?: number;
   abonado?: number;
   adeudo?: number;
   factura?: boolean;
   comentarios?: string;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
