const { Router } = require("express")

import patientRoutes from './patient.routes'

const routes = Router();

routes.use("/patient", patientRoutes)

export default routes