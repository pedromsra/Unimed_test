import { Router } from "express";

import PatientController from "../controllers/PatientController";

const patientRoutes = Router();

const patientController = new PatientController();

patientRoutes.post("/", patientController.create);
patientRoutes.put("/:id", patientController.update);
patientRoutes.get("/", patientController.index);
patientRoutes.get("/:id", patientController.show);
patientRoutes.delete("/:id", patientController.delete);

export default patientRoutes;