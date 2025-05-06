export class HorarioPerro {
    paseoMañana: Date;
    paseoMedioDia: Date;
    paseoTarde: Date;
    idPerro: string;
  
    constructor(
      paseoMañana: Date,
      paseoMedioDia: Date,
      paseoTarde: Date,
      idPerro: string
    ) {
      this.paseoMañana = paseoMañana;
      this.paseoMedioDia = paseoMedioDia;
      this.paseoTarde = paseoTarde;
      this.idPerro = idPerro;
    }
  }
  