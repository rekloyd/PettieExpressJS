import {TipoUsuario} from './enum/TipoUsuario';

export abstract class Usuario {
  static create(arg0: { id: string; nombre: string; nombreUsuario: string; contrasenaUsuario: string; emailUsuario: string; cantidadPetttieCoins: number;fechaAltaPlataforma:Date; role: string; }): void | PromiseLike<void> {
    throw new Error('Method not implemented.');
  }
  static findOne(arg0: { where: { nombreUsuario: string; }; }) {
    throw new Error('Method not implemented.');
  }
  id: string;
  nombre: string;
  nombreUsuario: string;
  contrasenaUsuario: string;
  emailUsuario: string;
  cantidadPetttieCoins: number;
  fechaAltaPlataforma:Date;
  role: TipoUsuario;

  constructor(
    id: string,
    nombre: string,
    nombreUsuario: string,
    contrasenaUsuario: string,
    emailUsuario: string,
    cantidadPetttieCoins: number,
    fechaAltaPlataforma:Date,
    role: TipoUsuario
  ) {
    this.id = id;
    this.nombre = nombre;
    this.nombreUsuario = nombreUsuario;
    this.contrasenaUsuario = contrasenaUsuario;
    this.emailUsuario = emailUsuario;
    this.cantidadPetttieCoins = cantidadPetttieCoins;
    this.fechaAltaPlataforma = fechaAltaPlataforma;
    this.role = role;
  }

  // Método abstracto (definir en clases que hereden)
  abstract obtenerInfo(): string;
}