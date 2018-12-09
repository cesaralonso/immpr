export interface Si_permisosInterface {
   idsi_permiso?: number;
   acceso?: boolean;
   Rol_idsi_rol?: number;
   Modulo_idsi_modulo?: number;
   readable?: boolean;
   writeable?: boolean;
   updateable?: boolean;
   deleteable?: boolean;
   read_own?: boolean;
   write_own?: boolean;
   update_own?: boolean;
   delete_own?: boolean;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
