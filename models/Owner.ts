import { Usuario } from './Usuario';
import { Mascota } from './Mascota';
import { Chat } from './msg/Chat';
import { Servicio } from '../models/services/Servicio';
import { TipoUsuario } from './enum/TipoUsuario';

class Owner extends Usuario {
  mascotasUsuario: Mascota[]; // Lista de mascotas asociadas al dueño (composición)
  serviciosReservados: Servicio[]; // Lista de servicios reservados por el dueño

  constructor(
    id: string,
    nombre: string,
    nombreUsuario: string,
    contrasenaUsuario: string,
    emailUsuario: string,
    cantidadPetttieCoins: number,
    listadoChats: Chat[] = [],
    role : TipoUsuario = TipoUsuario.OWNER
  ) {
    super(id, nombre, nombreUsuario, contrasenaUsuario, emailUsuario, cantidadPetttieCoins, listadoChats,role);
    this.mascotasUsuario = []; // Inicializamos vacío, solo dentro del Owner
    this.serviciosReservados = []; // Lista de servicios reservados
  }

  obtenerInfo(): string {
    return `Owner: ${this.nombre} (Usuario: ${this.nombreUsuario})`;
  }

  agregarMascota(mascota: Mascota): void {
    this.mascotasUsuario.push(mascota);  // Mascotas son gestionadas internamente
  }

  eliminarMascota(idMascota: string): void {
    this.mascotasUsuario = this.mascotasUsuario.filter(mascota => mascota.idMascota !== idMascota);
  }

  destruirMascotas(): void {
    this.mascotasUsuario = [];  // Eliminar todas las mascotas asociadas al Owner
  }
}

export { Owner };
