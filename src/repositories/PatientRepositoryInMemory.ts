import { Gender, Wings, Room, IPatientRepositoryInMemory } from "./definitionfile";

    export default class PatientRepositoryInMemory implements IPatientRepositoryInMemory{
    patients:{id: number, name: string, telephone: string, dateOfBirth: string, gender: Gender, wing: Wings, room: Room, CREATED_AT: Date, UPDATED_AT: Date}[] = [];

    
    findById(patient_id: number) {
        return this.patients.filter(patient => patient.id === patient_id)[0];
    }

    findByDateOfBirth(dateOfBirth: string) {
        return this.patients.filter(patient => patient.dateOfBirth === dateOfBirth)[0]
    }
    
    findByName(name: string) {
        return this.patients.filter(patient => patient.name === name)[0]
    }

    create(props: {name: string, telephone: string, dateOfBirth: string, gender: Gender, wing: Wings, room: Room}){

        const newpatientId = this.patients.length ? this.patients[this.patients.length - 1].id + 1 : 1

        const patient = {
            id: newpatientId,
            name: props.name,
            telephone: props.telephone,
            gender: props.gender,
            wing: props.wing,
            room: props.room,
            dateOfBirth: props.dateOfBirth,
            CREATED_AT: new Date(),
            UPDATED_AT: new Date()
        };

        this.patients.push(patient);

        return patient;
    }
    
    update(props: {patient_id: number, name: string, telephone: string, dateOfBirth: string, gender: Gender, wing: Wings, room: Room}) {
        const patientId = props.patient_id

        this.patients[patientId - 1].name = props.name
        this.patients[patientId - 1].telephone = props.telephone
        this.patients[patientId - 1].dateOfBirth = props.dateOfBirth
        this.patients[patientId - 1].gender = props.gender
        this.patients[patientId - 1].wing = props.wing
        this.patients[patientId - 1].room = props.room
        this.patients[patientId - 1].UPDATED_AT = new Date()

        return this.patients[patientId - 1]
    }

    show(props: {patient_id?: number, name?: string}) {
        
        if(props.name) {
            return this.patients[this.findByName(props.name).id -1]
        } else if (props.patient_id) {
            return this.patients[this.findById(props.patient_id).id -1]
        }

    }

    index(props?: {wing?: Wings, gender?: Gender, room?: Room, name?: string}) {

        if(props && props.wing) {
            return this.patients.filter(patient => patient.wing === props.wing)
        } else if(props && props.gender) {
            return this.patients.filter(patient => patient.gender === props.gender)
        } else if (props && props.room) {
            return this.patients.filter(patient => patient.room === props.room)
        } else {
            return this.patients
        }
    }

    delete(patient_id: number) {
        const deletePatient = this.patients.filter(patient => patient.id !== patient_id)
        this.patients = deletePatient
    }
}