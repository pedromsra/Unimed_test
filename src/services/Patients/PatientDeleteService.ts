import { IPatientRepository } from "../../repositories/definitionfile";

class PatientDeleteService {
    private patientRepository:IPatientRepository
    
    constructor(receivedPatientRepository: IPatientRepository) {
        this.patientRepository = receivedPatientRepository
    }
    
    async execute(patient_id: number){

        const patient = await this.patientRepository.findById(patient_id);
        
        if(!patient) {
            throw 'Paciente não encontrado'
        }

        try {
            await this.patientRepository.delete(patient_id)
        } catch (e) {
            throw e
        }

        return 'deleted';
    }
}

export default PatientDeleteService;