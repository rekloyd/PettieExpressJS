import { Mascota } from "./Mascota";

export enum RazaGato {
    Persa = "Persa",
    Siamés = "Siamés",
    MaineCoon = "Maine Coon",
    Bengalí = "Bengalí",
    Ragdoll = "Ragdoll",
    Abisinio = "Abisinio",
    BritishShorthair = "British Shorthair",
    Sphynx = "Sphynx",
    ScottishFold = "Scottish Fold",
    Birmano = "Birmano"
  }
  
  export class Gato extends Mascota {
    razaGato: RazaGato;
  
    constructor(
      idMascota: string,
      nombreMascota: string,
      tamanoMascota: string,
      cuidadosEspeciales: string,
      idUsuario: number,
      razaGato: RazaGato
    ) {
      super(idMascota, nombreMascota, tamanoMascota, cuidadosEspeciales, idUsuario);
      this.razaGato = razaGato;
    }
  }
  