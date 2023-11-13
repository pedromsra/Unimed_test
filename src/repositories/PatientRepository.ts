import { AppDataSource } from "../data-source";
import { Patient } from "../entities/Patient";
import { IPatientRepository, Wings, Room, Gender } from "./definitionfile";

class PatientsRepository implements IPatientRepository {

    async findById(patient_id: number) {
        
        let patient
        try {
            patient = await AppDataSource.getRepository(Patient).findOneBy({
                id: patient_id,
            })
        } catch (e) {
            throw e
        }

        return patient;
    }

    async findByDateOfBirth(dateOfBirth: string) {
        let patient
        try {
            patient = await AppDataSource.getRepository(Patient).findOneBy({
                dateOfBirth: dateOfBirth,
            })
        } catch (e) {
            throw e
        }

        return patient;
    }

    async findByName(name: string) {
        let patient
        try {
            patient = await AppDataSource.getRepository(Patient).findOneBy({
                name: name.normalize('NFD').replace(/\p{Mn}/gu, ""),
            })
        } catch (e) {
            throw e
        }
        return patient;
    }


    async create(props: {name: string, telephone: string, dateOfBirth: string, gender: Gender, wing: Wings, room: Room}) {
        let patientId

        try {
            patientId = await AppDataSource
                .createQueryBuilder()
                .insert()
                .into(Patient)
                .values({
                    name: props.name,
                    telephone: props.telephone,
                    gender: props.gender,
                    wing: props.wing,
                    room: props.room,
                    dateOfBirth: props.dateOfBirth
                })
                .execute()
        } catch (e) {
            throw e
        }


        return patientId.identifiers[0].id
    }

    async update(props: {patient_id: number, name: string, telephone: string, dateOfBirth: string, gender: Gender, wing: Wings, room: Room}) {
        let patientId
        try {
            patientId = await AppDataSource
                .createQueryBuilder()
                .update(Patient)
                .set({
                    name: props.name,
                    telephone: props.telephone,
                    room: props.room,
                    wing: props.wing,
                    gender: props.gender,
                    dateOfBirth: props.dateOfBirth,
                    UPDATED_AT: new Date().toJSON(),
                })
                .where('id = :patient_id', { patient_id: props.patient_id })
                .execute()
        } catch (e) {
            throw e
        }

        return patientId
    }

    async show(props: {patient_id?: number, name?: string}) {
        let patient
        try {
            if(props.name) {
                patient = await AppDataSource.getRepository(Patient).findOneBy({
                    name: props.name,
                })
            } else if (props.patient_id) {
                patient = await AppDataSource.getRepository(Patient).findOneBy({
                    id: props.patient_id,
                })
            }
        } catch (e) {
            throw e
        }

        return patient;
    }

    async index(props: {wing?: Wings, gender?: Gender, room?: Room, name?: string}) {
        let patients
        try {
            if(props.wing && !props.gender && !props.room) {
                patients = await AppDataSource.getRepository(Patient)
                .createQueryBuilder('patients')
                .where('patients.wing = :wing', {wing: props.wing})
                .getMany()
            } else if(props.gender && !props.room && !props.wing) {
                patients = await AppDataSource.getRepository(Patient)
                .createQueryBuilder('patients')
                .where('patients.gender = :gender', {gender: props.gender})
                .getMany()
            } else if (props.room && !props.wing && !props.gender) {
                patients = await AppDataSource.getRepository(Patient)
                .createQueryBuilder('patients')
                .where('patients.room = :room', {room: props.room})
                .getMany()
            } else if (props.room && props.wing && !props.gender) {
                patients = await AppDataSource.getRepository(Patient)
                .createQueryBuilder('patients')
                .where('patients.room = :room', {room: props.room})
                .andWhere('patients.wing = :wing', {wing: props.wing})
                .getMany()
            } else if (props.room && props.wing && props.gender) {
                patients = await AppDataSource.getRepository(Patient)
                .createQueryBuilder('patients')
                .where('patients.room = :room', {room: props.room})
                .andWhere('patients.wing = :wing', {wing: props.wing})
                .andWhere('patients.gender = :gender', {gender: props.gender})
                .getMany()
            } else if(!props.wing && !props.gender && !props.room && props.name) {
                patients = await AppDataSource.getRepository(Patient)
                .createQueryBuilder('patients')
                .where('patients.name like :name', {name: `%${props.name}%`})
                .getMany()
            } else {
                patients = await AppDataSource.getRepository(Patient)
                .createQueryBuilder('patients').getMany()
            }
        } catch (e) {
            throw e
        }
        return(patients)
    }

    async delete(patient_id: number) {
        try {
            await AppDataSource
                .createQueryBuilder()
                .delete()
                .from(Patient)
                .where('id = :patient_id', { patient_id: patient_id })
                .execute()
        } catch (e) {
            throw e
        }

        return 'deleted'
    }
}

export default PatientsRepository;