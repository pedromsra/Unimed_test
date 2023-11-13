import { Request, Response } from "express";

import PatientCreateService from "../services/Patients/PatientCreateService"
import PatientUpdateService from "../services/Patients/PatientUpdateService"
import PatientIndexService from "../services/Patients/PatientIndexService";
import PatientDeleteService from "../services/Patients/PatientDeleteService";
import PatientShowService from "../services/Patients/PatientShowService";

import PatientRepository from "../repositories/PatientRepository"

class PatientController {
    async create (request: Request, response: Response) {
        const {name, telephone, dateOfBirth, gender, wing, room} = request.body


        const patientRepository = new PatientRepository();
        const patientCreateService = new PatientCreateService(patientRepository);
        
        let patient_id
        try {
            patient_id = await patientCreateService.execute({name, telephone, dateOfBirth, gender, wing, room})
        } catch (e:any) {
            return response.status(400).json({
                status: "error",
                message: e?.message ? e.message : e
            })
        }

        return response.status(201).json({id: patient_id, name, telephone, dateOfBirth, gender, wing, room});
    }

    async update (request: Request, response: Response) {
        const {name, telephone, dateOfBirth, gender, wing, room} = request.body

        const patient_id = Number(request.params.id)

        const patientRepository = new PatientRepository();
        const patientUpdateService = new PatientUpdateService(patientRepository);
        
        let patientUpdated
        try {
            patientUpdated = await patientUpdateService.execute({patient_id, name, telephone, dateOfBirth, gender, wing, room})
        } catch (e:any) {
            return response.status(400).json({
                status: "error",
                message: e?.message ? e.message : e
            })
        }

        return response.status(201).json({patientUpdated});
    }

    async index (request: Request, response: Response) {
        const {gender, wing, room, name} = request.body

        const patientRepository = new PatientRepository();
        const patientIndexService = new PatientIndexService(patientRepository);
        
        let patientIndex
        try {
            patientIndex = await patientIndexService.execute({gender, wing, room, name})
        } catch (e:any) {
            return response.status(400).json({
                status: "error",
                message: e?.message ? e.message : e
            })
        }

        return response.status(201).json({patientIndex});
    }

    async show (request: Request, response: Response) {
        const patient_id = Number(request.params.id)

        const patientRepository = new PatientRepository();
        const patientShowService = new PatientShowService(patientRepository);
        
        let patientShow
        try {
            patientShow = await patientShowService.execute({patient_id: patient_id})
        } catch (e:any) {
            return response.status(400).json({
                status: "error",
                message: e?.message ? e.message : e
            })
        }

        return response.status(201).json({patientShow});
    }

    async delete (request: Request, response: Response) {

        const patient_id = Number(request.params.id)

        const patientRepository = new PatientRepository();
        const patientDeleteService = new PatientDeleteService(patientRepository);
        
        try {
            await patientDeleteService.execute(patient_id)
        } catch (e:any) {
            return response.status(400).json({
                status: "error",
                message: e?.message ? e.message : e
            })
        }

        return response.status(201).json();
    }
}

export default PatientController;