import { Router } from "express";
import {
  getMascotas,
  getMascotasPorIdOwner,
  getMascotasPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
} from "../controllers/MascotaController";

const router = Router();

router.get('/mascotas', getMascotas);
router.get('/mascotas/owner/:idOwner', getMascotasPorIdOwner);
router.get('/mascotas/:idMascota', getMascotasPorId);

router.post("/mascotas", crearMascota);
router.put("/mascotas/:idMascota", actualizarMascota);
router.delete("/mascotas/:idMascota", eliminarMascota);

export default router;
