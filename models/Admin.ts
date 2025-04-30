import { Usuario } from './Usuario';
import { Chat } from './msg/Chat';
import { TipoServicio } from './enum/TipoServicio';

class Admin extends Usuario {
  nivelUsuario: TipoServicio;

  constructor(
    id: string,
    nombre: string,
    nombreUsuario: string,
    contrasenaUsuario: string,
    emailUsuario: string,
    cantidadPetttieCoins: number,
    listadoChats: Chat[] = [],
    nivelUsuario: TipoServicio,
  ) {
    super(id, nombre, nombreUsuario, contrasenaUsuario, emailUsuario, cantidadPetttieCoins, listadoChats);
    this.nivelUsuario = nivelUsuario;
  }

  obtenerInfo(): string {
    return `Nombre: ${this.nombre} (Usuario: ${this.nombreUsuario})`;
  }
}


export { Admin };
