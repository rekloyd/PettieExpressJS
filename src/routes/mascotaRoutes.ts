import { Router } from "express";
import {
  getMascotas,
  getMascotasPorOwner,
  getMascotasPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
} from "../controllers/MascotaController";

const router = Router();

router.get("/mascotas", getMascotas);
router.get("mascotas/:idOwner", getMascotasPorId);
router.get("mascotas/owner/:idOwner", getMascotasPorOwner);

router.post("/mascotas", crearMascota);
router.put("/mascotas/:idMascota", actualizarMascota);
router.delete("/mascotas/:idMascota", eliminarMascota);

export default router;
