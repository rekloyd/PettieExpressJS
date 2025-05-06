import { Usuario } from './Usuario';
import { Chat } from './msg/Chat';
import { TipoUsuario } from './enum/TipoUsuario';

class Admin extends Usuario {
  constructor(
    id: string,
    nombre: string,
    nombreUsuario: string,
    contrasenaUsuario: string,
    emailUsuario: string,
    cantidadPetttieCoins: number,
    listadoChats: Chat[] = [],
    role:TipoUsuario,
  ) {
    super(id, nombre, nombreUsuario, contrasenaUsuario, emailUsuario, cantidadPetttieCoins, listadoChats,role);
    
  }

  obtenerInfo(): string {
    return `Nombre: ${this.nombre} (Usuario: ${this.nombreUsuario})`;
  }
}


export { Admin };
