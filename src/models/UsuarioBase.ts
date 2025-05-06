import { TipoUsuario } from './enum/TipoUsuario';
import { Usuario } from './Usuario';  // Importa la clase abstracta Usuario

// Clase concreta que extiende de Usuario
export class UsuarioBase extends Usuario {
  constructor(
    id: string,
    nombre: string,
    nombreUsuario: string,
    contrasenaUsuario: string,
    emailUsuario: string,
    cantidadPetttieCoins: number,
    role: TipoUsuario,
    fechaAltaPlataforma: Date
  ) {
    // Llamamos al constructor de la clase abstracta (padre)
    super(id, nombre, nombreUsuario, contrasenaUsuario, emailUsuario, cantidadPetttieCoins, fechaAltaPlataforma, role);
  }

  // Implementación del método abstracto
  obtenerInfo(): string {
    return `Usuario: ${this.nombre}, Correo: ${this.emailUsuario}, Rol: ${this.role}`;
  }
}