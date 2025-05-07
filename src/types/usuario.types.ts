export type MascotaUsuario = {
    id: number;
    nombre: string | null;
    tipo: string | null;
  };
  
  export type UsuarioConMascotasAnidadas = {
    id: number;
    nombre: string;
    email: string;
    mascotas: MascotaUsuario[];
  };

  
  export type UsuarioConMascota = {
    userId: number;
    userNombre: string;
    email: string;
    mascotaId: number | null;
    mascotaNombre: string | null;
    tipo: string | null;
  };