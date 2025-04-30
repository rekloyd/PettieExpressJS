
export class Mascota {
    idMascota: string;
    nombreMascota: string;
    tamanoMascota: string;
    cuidadosEspeciales: string;
    idUsuario: number;
  
    constructor(
      idMascota: string,
      nombreMascota: string,
      tamanoMascota: string,
      cuidadosEspeciales: string,
      idUsuario: number
    ) {
      this.idMascota = idMascota;
      this.nombreMascota = nombreMascota;
      this.tamanoMascota = tamanoMascota;
      this.cuidadosEspeciales = cuidadosEspeciales;
      this.idUsuario = idUsuario;
    }
  }
  