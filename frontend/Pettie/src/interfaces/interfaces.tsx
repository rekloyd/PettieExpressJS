export interface Servicio {
  idActividad: number;
  idOwner: number;
  idPettier: number;
  idMascota: number;
  tipoActividad: string;
  fechaInicio: string;   // o Date si parseas
  fechaFinal: string;    // o Date si parseas
  precio: number;
  finalizado: boolean;
}

