
import connectDB from '../db/connection';
import { ResultSetHeader } from 'mysql2'; //Es el tipo de dato que devuelve un UPDATE,INSERT y DELETE
import {MascotaFilter} from '../types/mascota.types';


 
export class mascotaRepository {
    static async getMascotas(page:number,limit:number){
        const offset = (page-1) * limit;
        const db = await connectDB();
        const [rows] = await db.query(`
        SELECT * 
        FROM Mascota 
        LIMIT ? OFFSET ?
        `, [limit, offset]);
        return rows;

    }

static async getMascotasPorId(idMascota:string){
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM Mascota WHERE idMascota = ? ', [idMascota]);
    return rows;
}

static async getMascotrasPorIdOwner(idOwner:number){
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM Mascota WHERE idOwner = ? ', [idOwner]);
    console.log(`SELECT * FROM Mascota WHERE idOwner = ${idOwner}`);
    return rows;

}

static async actualizarMascota(idMascota:number,nombreMascota:string, tamanoMascota:string,cuidadosEspeciales:string,paseoManana:string,paseoMedioDia:string,paseoTarde:string,razaPerro:string,razaGato:string){
    const db = await connectDB();
    const [result] = await db.query(`
        UPDATE Mascota
        SET nombreMascota       = ?,
            tamanoMascota       = ?,
            cuidadosEspeciales  = ?,
            paseoManana         = ?,
            paseoMedioDia       = ?,
            paseoTarde          = ?,
            razaPerro           = ?,
            razaGato            = ?
        WHERE idMascota = ?
        `, [
        nombreMascota,
        tamanoMascota,
        cuidadosEspeciales,
        paseoManana,
        paseoMedioDia,
        paseoTarde,
        razaPerro,
        razaGato,
        idMascota
        ]);

        if((result as ResultSetHeader).affectedRows ===0){
            return  0;

        }else{
            return 1;
        }
}

static async eliminarMascota(idMascota:number){
    const db = await connectDB();
    const [result] = await db.query(`
      DELETE FROM Mascota 
      WHERE idMascota = ?
    `, [idMascota]);

        if((result as ResultSetHeader).affectedRows ===0){
            return  0;

        }else{
            return 1;
        }
}

static async getMascotasFiltered(filtros: MascotaFilter) {
  const db = await connectDB();

  const condiciones: string[] = [];
  const valores: any[] = [];

  if (filtros.nombreMascota) {
    condiciones.push("nombreMascota = ?");
    valores.push(filtros.nombreMascota);
  }
  if (filtros.tamanoMascota) {
    condiciones.push("tamanoMascota = ?");
    valores.push(filtros.tamanoMascota);
  }
  if (filtros.cuidadosEspeciales) {
    condiciones.push("cuidadosEspeciales = ?");
    valores.push(filtros.cuidadosEspeciales);
  }
  if (filtros.paseoManana) {
    condiciones.push("paseoManana = ?");
    valores.push(filtros.paseoManana);
  }
  if (filtros.paseoMedioDia) {
    condiciones.push("paseoMedioDia = ?");
    valores.push(filtros.paseoMedioDia);
  }
  if (filtros.paseoTarde) {
    condiciones.push("paseoTarde = ?");
    valores.push(filtros.paseoTarde);
  }
  if (filtros.razaPerro) {
    condiciones.push("razaPerro = ?");
    valores.push(filtros.razaPerro);
  }
  if (filtros.razaGato) {
    condiciones.push("razaGato = ?");
    valores.push(filtros.razaGato);
  }
  if (filtros.idOwner !== undefined) {
    condiciones.push("idOwner = ?");
    valores.push(filtros.idOwner);
  }

  const whereClause = condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";

  const [rows] = await db.query(`SELECT * FROM Mascota ${whereClause}`, valores);

  return rows;
}


}

export default mascotaRepository;
