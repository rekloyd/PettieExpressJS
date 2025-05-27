//Interfaces y tipos de mascotas que usamos a lo largo del programa
export interface MascotaFilter {
  nombreMascota?: string;
  tamanoMascota?: string;
  cuidadosEspeciales?: string;
  paseoManana?: string;
  paseoMedioDia?: string;
  paseoTarde?: string;
  razaPerro?: string;
  razaGato?: string;
  idOwner?: number;
}