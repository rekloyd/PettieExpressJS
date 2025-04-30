// models/Petter.ts
import { Usuario } from './Usuario';
import { Mascota } from './Mascota';

interface Servicios {
  nombre: string;
  descripcion: string;
}

export class Petter extends Usuario {
  numeroCuenta: string;
  serviciosOfrecidos: Servicios[];
  serviciosPendientes: Servicios[];
  serviciosCompletados: Servicios[];
  numeroReviews: number;
  mediaReviews: number;
  usuariosRepetidores: number;
  fechaAltaPlataforma: Date;
  mascotaEspecialista: Mascota[];

  constructor(
    id: string,
    nombre: string,
    nombreUsuario: string,
    contrasenaUsuario: string,
    emailUsuario: string,
    cantidadPetttieCoins: number,
    numeroCuenta: string,
    serviciosOfrecidos: Servicios[],
    serviciosPendientes: Servicios[],
    serviciosCompletados: Servicios[],
    numeroReviews: number,
    mediaReviews: number,
    usuariosRepetidores: number,
    fechaAltaPlataforma: Date,
    mascotaEspecialista: Mascota[],
    role : string = 'pettier' // Asignar el rol por defecto
  ) {
    super(id, nombre, nombreUsuario, contrasenaUsuario, emailUsuario, cantidadPetttieCoins, [], role);
    this.numeroCuenta = numeroCuenta;
    this.serviciosOfrecidos = serviciosOfrecidos;
    this.serviciosPendientes = serviciosPendientes;
    this.serviciosCompletados = serviciosCompletados;
    this.numeroReviews = numeroReviews;
    this.mediaReviews = mediaReviews;
    this.usuariosRepetidores = usuariosRepetidores;
    this.fechaAltaPlataforma = fechaAltaPlataforma;
    this.mascotaEspecialista = mascotaEspecialista;
    this.listadoChats = [];
    this.role = 'pettier'; // Asignar el rol por defecto
  }

  // Métodos adicionales

  agregarServicio(servicio: Servicios): void {
    this.serviciosOfrecidos.push(servicio);
  }

  agregarServicioPendiente(servicio: Servicios): void {
    this.serviciosPendientes.push(servicio);
  }

  completarServicio(servicio: Servicios): void {
    const index = this.serviciosPendientes.indexOf(servicio);
    if (index !== -1) {
      this.serviciosPendientes.splice(index, 1);
      this.serviciosCompletados.push(servicio);
    }
  }

  actualizarReviews(nuevaReview: number): void {
    this.numeroReviews++;
    this.mediaReviews = ((this.mediaReviews * (this.numeroReviews - 1)) + nuevaReview) / this.numeroReviews;
  }

  obtenerInfo(): string {
    return `Nombre: ${this.nombre}, Usuario: ${this.nombreUsuario}, Cuenta: ${this.numeroCuenta}, Reseñas: ${this.numeroReviews}, Media de Reseñas: ${this.mediaReviews}`;
  }
}
