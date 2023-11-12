import { Request, Response } from "express";

import PatientCreateService from "../services/Patients/PatientCreateService"
// import PatientUpdateService from "../services/Patients/PatientUpdateService"
// import PatientIndexService from "../services/Patients/PatientIndexService";
// import PatientDeleteService from "../services/Patients/PatientDeleteService";
// import PatientShowService from "../services/Patients/PatientShowService";

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

    // async update  (request: Request, response: Response) {

    //     const customer_id = Number(request.headers.customer_id)

    //     if (!customer_id) {
    //         return response.status(400).json({
    //             status: "error",
    //             message: "É necessário estar logado para atualizar suas informações"
    //         })
    //     }

    //     const {name, email, telephone, zone, registryType, registryNumber, passwordOld, passwordNew} = request.body;

    //     const customerRepository = new CustomerRepository();
    //     const customerUpdateService = new CustomerUpdateService(customerRepository);

    //     let customerUpdated:any
    //     try {
    //         customerUpdated = await customerUpdateService.execute({customer_id, name, email, telephone, zone, registryType, registryNumber, passwordOld, passwordNew});
    //     } catch (err) {
    //         return response.status(400).json({
    //             status: "error",
    //             message: err
    //         })
    //     }

    //     return response.status(201).json(customerUpdated);
    // }

    // async delete (request: Request, response: Response) {
    //     const user_id = request.user.id;

    //     if(!user_id) {
    //         throw new AppError("É necessário estar autenticado para excluir sua conta", 401)
    //     }

    //     const customerRepository = new CustomerRepository();

    //     await customerRepository.delete({user_id});

    //     return response.json();
    // }
}

export default PatientController;