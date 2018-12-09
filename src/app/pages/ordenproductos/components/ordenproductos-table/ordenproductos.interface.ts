export interface OrdenproductosInterface {
   idordenproducto?: number;
   orden_idorden?: number;
   producto_idproducto?: number;
   cantidad?: number;
   ancho?: number;
   alto?: number;
   tipoprecio_idtipoprecio?: number;
   precio?: number;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
