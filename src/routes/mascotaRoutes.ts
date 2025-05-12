import { Router } from "express";
import {
  getMascotas,
  getMascotasPorIdOwner,
  getMascotasPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
  getMascotasFiltered
} from "../controllers/MascotaController";

const router = Router();

// GET
router.get('/mascotas', getMascotas);
router.get('/mascotas/filtered', getMascotasFiltered);
router.get('/mascotas/owner/:idOwner', getMascotasPorIdOwner);
router.get('/mascotas/:idMascota', getMascotasPorId);

// POST
router.post("/mascotas", crearMascota);

//PUT
router.put("/mascotas/:idMascota", actualizarMascota);

//DELETE
router.delete("/mascotas/:idMascota", eliminarMascota);



export default router;
