import { IPatientRepository } from "../../repositories/definitionfile";

class PatientDeleteService {
    private patientRepository:IPatientRepository
    
    constructor(receivedPatientRepository: IPatientRepository) {
        this.patientRepository = receivedPatientRepository
    }
    
    async execute(patient_id: number){
        
        try {
            await this.patientRepository.delete(patient_id)
        } catch (e) {
            throw e
        }

        return ;
    }
}

export default PatientDeleteService;