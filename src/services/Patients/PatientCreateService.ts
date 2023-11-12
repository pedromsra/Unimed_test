import { IPatientRepository, Wings, Room, Gender, IPatientRepositoryInMemory } from "../../repositories/definitionfile";

class PatientCreateService {
    private patientRepository:IPatientRepository | IPatientRepositoryInMemory
    
    constructor(receivedPatientRepository: IPatientRepository | IPatientRepositoryInMemory) {
        this.patientRepository = receivedPatientRepository
    }
    
    async execute(props: {name: string, telephone: string, dateOfBirth: string, gender: Gender, wing: Wings, room: Room}){

        if(!props.name){
            throw 'O nome do paciente deve ser informado'
        }

        if(!props.dateOfBirth){
            throw 'A date de nascimento do paciente deve ser informada'
        }

        if(!props.telephone) {
            throw 'O telefone do pasciente deve ser informado'
        }

        if (!props.gender) {
            throw 'O genero do pasciente deve ser informado'
        }

        if (!props.wing) {
            throw 'A ala do pasciente deve ser iformada'
        }

        if (!props.room) {
            throw 'O quarto do pasciente deve ser informado'
        }

        if (props.dateOfBirth.split('/').length !== 3 || props.dateOfBirth.split('/')[0].length !== 2 || props.dateOfBirth.split('/')[1].length !== 2 || props.dateOfBirth.split('/')[2].length !== 4) {
            throw 'Digite uma data de nascimento válida, no formato: DD/MM/AAAA'
        }

        const wingList = Object.keys(Wings).filter((item) => isNaN(Number(item)))
        const checkWing = wingList.includes(props.wing)
        
        if (!checkWing) {
            throw 'Digite uma ala válida: A ou B.'
        }

        const genderList = Object.keys(Gender).filter((item) => isNaN(Number(item)))
        const checkGender = genderList.includes(props.gender)

        if (!checkGender) {
            throw 'Digite um gênero válido: masculino ou feminino.'
        }

        const roomList = Object.keys(Room).filter((item) => !isNaN(Number(item)))
        const checkRoom = roomList.includes(String(props.room))

        if (!checkRoom) {
            throw 'Digite um quarto válido: 1 a 9.'
        }

        const checkName = await this.patientRepository.findByName(props.name);
        const checkDateOfBirth = await this.patientRepository.findByName(props.name);
        
        if(checkName && checkDateOfBirth && checkName.id === checkDateOfBirth.id) {
            throw "Paciente já cadastrado, com mesmo nome e data de nascimento";
        }

        let patientCreated
        
        try {
            patientCreated = await this.patientRepository.create({name: props.name, telephone: props.telephone, dateOfBirth: props.dateOfBirth, gender: props.gender, wing: props.wing, room: props.room})
        } catch (e) {
            throw e
        }

        return patientCreated;
    }
}

export default PatientCreateService;