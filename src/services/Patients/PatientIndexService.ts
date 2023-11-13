import { IPatientRepository, Wings, Room, Gender, IPatientRepositoryInMemory } from "../../repositories/definitionfile";

class PatientIndexService {
    private patientRepository:IPatientRepository | IPatientRepositoryInMemory
    
    constructor(receivedPatientRepository: IPatientRepository | IPatientRepositoryInMemory) {
        this.patientRepository = receivedPatientRepository
    }
    
    async execute(props?: {wing?: Wings, gender?: Gender, room?: Room, name?: string}){

        const wingList = Object.keys(Wings).filter((item) => isNaN(Number(item)))
        const checkWing = props && props.wing && wingList.includes(props.wing)
        
        if (props && props.wing && !checkWing) {
            throw 'Digite uma ala válida: A ou B.'
        }

        const genderList = Object.keys(Gender).filter((item) => isNaN(Number(item)))
        const checkGender = props && props.gender && genderList.includes(props.gender)

        if (props && props.gender && !checkGender) {
            throw 'Digite um gênero válido: masculino ou feminino.'
        }

        const roomList = Object.keys(Room).filter((item) => !isNaN(Number(item)))
        const checkRoom = props && props.room && roomList.includes(String(props.room))

        if (props && props.room && !checkRoom) {
            throw 'Digite um quarto válido: 1 a 9.'
        }

        let patientIndex
        
        try {
            patientIndex = props && await this.patientRepository.index({wing: props.wing, gender: props.gender, room: props.room, name: props.name})
        } catch (e) {
            throw e
        }

        return patientIndex;
    }
}

export default PatientIndexService;