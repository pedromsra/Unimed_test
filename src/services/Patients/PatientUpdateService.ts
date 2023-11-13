import { IPatientRepository, Wings, Gender, Room, IPatientRepositoryInMemory } from "../../repositories/definitionfile";

class PatientUpdateService {
    private patientRepository:IPatientRepository | IPatientRepositoryInMemory
    
    constructor(receivedPatientRepository: IPatientRepository | IPatientRepositoryInMemory) {
        this.patientRepository = receivedPatientRepository
    }

    async execute(props: {patient_id: number, name: string, telephone: string, dateOfBirth: string, gender: string, wing: string, room: number} ) {
        const patient = await this.patientRepository.findById(props.patient_id);
        
        if (!patient) {
            throw "Paciente não encontrado"
        }

        const wingList = Object.keys(Wings).filter((item) => isNaN(Number(item)))
        const checkWing = wingList.includes(props.wing)

        const genderList = Object.keys(Gender).filter((item) => isNaN(Number(item)))
        const checkGender = genderList.includes(props.gender)

        const roomList = Object.keys(Room).filter((item) => !isNaN(Number(item)))
        const checkRoom = roomList.includes(String(props.room))

        if (!checkWing) {
            throw 'Digite uma ala válida: A ou B.'
        }

        if (!checkGender) {
            throw 'Digite um gênero válido: masculino ou feminino.'
        }

        if (!checkRoom) {
            throw 'Digite um quarto válido: 1 a 9.'
        }
        
        if (props.dateOfBirth.split('/').length !== 3 || props.dateOfBirth.split('/')[0].length !== 2 || props.dateOfBirth.split('/')[1].length !== 2 || props.dateOfBirth.split('/')[2].length !== 4) {
            throw 'Digite uma data de nascimento válida, no formato: DD/MM/AAAA'
        }

        if (props.name) {
            const checkName = await this.patientRepository.findByName(props.name.normalize('NFD').replace(/\p{Mn}/gu, ""))
            
            if (checkName && checkName.id !== props.patient_id ) {
                throw "Paciente já cadastrado com mesmo nome"
            }
        }

        patient.name = props.name ?? patient.name
        patient.telephone = props.telephone ?? patient.telephone
        patient.dateOfBirth = props.dateOfBirth ?? patient.dateOfBirth
        patient.gender = props.gender ?? patient.gender
        patient.wing = props.wing ?? patient.wing
        patient.room = props.room ?? patient.room

        let patientUpdated
        try {
            patientUpdated = await this.patientRepository.update({
                patient_id: props.patient_id,
                name: patient.name.normalize('NFD').replace(/\p{Mn}/gu, ""),
                telephone: patient.telephone,
                dateOfBirth: patient.dateOfBirth,
                wing: patient.wing,
                gender: patient.gender,
                room: patient.room,
            })
        } catch (e) {
            throw e
        }

        return patientUpdated
    }
}

export default PatientUpdateService;