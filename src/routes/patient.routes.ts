import { Router } from "express";

import PatientController from "../controllers/PatientController";

const patientRoutes = Router();

const patientController = new PatientController();

patientRoutes.post("/", patientController.create);
// customerRoutes.put("/", ensureAuthenticated, customersController.update);
// customerRoutes.delete("/", ensureCustomerAuthenticated, customersController.delete);

export default patientRoutes;