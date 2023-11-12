import { IPatientRepository, IPatientRepositoryInMemory } from "../../repositories/definitionfile";

class PatientShowService {
    private patientRepository:IPatientRepository | IPatientRepositoryInMemory
    
    constructor(receivedPatientRepository: IPatientRepository | IPatientRepositoryInMemory) {
        this.patientRepository = receivedPatientRepository
    }
    
    async execute(props: {patient_id?: number, name?: string}){
        
        if (!props.patient_id && !props.name) {
            throw 'Deve ser informado o id ou nome do paciente'
        }

        let patientShow
        
        try {
            patientShow = await this.patientRepository.show({patient_id: props.patient_id, name: props.name})
        } catch (e) {
            throw e
        }

        return patientShow;
    }
}

export default PatientShowService;