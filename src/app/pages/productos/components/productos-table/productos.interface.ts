export interface ProductosInterface {
   idproducto?: number;
   formula_idformula?: number;
   nombre?: string;
   area_idarea?: number;
   duracionEstimada?: number;
   precioPublico?: number;
   precioMayoreo?: number;
   precioMaquila?: number;
   extraPor?: string;
   extraPrecio?: number;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
