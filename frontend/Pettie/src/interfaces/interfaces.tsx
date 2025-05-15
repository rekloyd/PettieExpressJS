export interface Servicio {
  idActividad: number;
  idOwner: number;
  nombreUsuario:String,
  idPettier: number;
  idMascota: number;
  tipoActividad: string;
  fechaInicio: string;   // o Date si parseas
  fechaFinal: string;    // o Date si parseas
  tamanoMascota: string,
  precio: number;
  finalizado: boolean;
}

