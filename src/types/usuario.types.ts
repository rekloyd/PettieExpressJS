export type MascotaUsuario = {
    id: number;
    nombre: string | null;
    tamano:String | null;
    cuidadosEspeciales:String | null;
    paseoManana:Date | null;
    paseoMedioDia:Date| null;
    paseoTarde:Date| null;

  };
  
  export type UsuarioConMascotasAnidadas = {
    id: number;
    nombre: string;
    email: string;
    cantidadPettieCoins:number;
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