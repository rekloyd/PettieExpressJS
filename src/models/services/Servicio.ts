import { TipoServicio } from '../enum/TipoServicio';

export class Servicio {
  idActividad: string;
  tipoActividad: TipoServicio;
  fechaInicio: Date;
  fechaFin: Date;
  finalizado: boolean;

  constructor(
    idActividad: string,
    tipoActividad: TipoServicio,
    fechaInicio: Date,
    fechaFin: Date,
    finalizado: boolean
  ) {
    this.idActividad = idActividad;
    this.tipoActividad = tipoActividad;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.finalizado = finalizado;
  }

  obtenerDescripcion(): string {
    return `${this.tipoActividad} desde ${this.fechaInicio.toLocaleString()} hasta ${this.fechaFin.toLocaleString()} - ${this.finalizado ? 'Finalizado' : 'En progreso'}`;
  }
}
