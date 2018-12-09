export interface EgresoconceptosInterface {
   idegresoconcepto?: number;
   concepto_idconcepto?: number;
   fecha?: string;
   hora?: string;
   precioSinIva?: number;
   precioConIva?: number;
   cantidad?: number;
   subtotal?: number;
   total?: number;
   empleado_idempleado?: number;
   comentarios?: string;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
