import { Mascota } from "./Mascota";
import { HorarioPerro } from "./HorarioPerro";

export enum RazaPerro {
    Labrador = "Labrador",
    Bulldog = "Bulldog",
    Beagle = "Beagle",
    Poodle = "Poodle",
    Boxer = "Boxer",
    Chihuahua = "Chihuahua",
    Dachshund = "Dachshund",
    Rottweiler = "Rottweiler",
    GoldenRetriever = "Golden Retriever",
    Husky = "Husky"
  }
  
  export class Perro extends Mascota {
    razaPerro: RazaPerro;
    idHorarioPaseo: string;
    horarioPerro: HorarioPerro;
  
    constructor(
      idMascota: string,
      nombreMascota: string,
      tamanoMascota: string,
      cuidadosEspeciales: string,
      idUsuario: number,
      razaPerro: RazaPerro,
      idHorarioPaseo: string,
      horarioPerro: HorarioPerro
    ) {
      super(idMascota, nombreMascota, tamanoMascota, cuidadosEspeciales, idUsuario);
      this.razaPerro = razaPerro;
      this.idHorarioPaseo = idHorarioPaseo;
      this.horarioPerro = horarioPerro;
    }
  }
  