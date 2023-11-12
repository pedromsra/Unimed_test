export enum Wings {
    A = 'A',
    B = 'B'
}

export enum Room { 
    r1 = 1,
    r2 = 2,
    r3 = 3,
    r4 = 4,
    r5 = 5,
    r6 = 6,
    r7 = 7,
    r8 = 8,
    r9 = 9
}

export enum Gender {
    masculino = 'masculino',
    feminino = 'feminino'
}

type createPatient = {
    name: string, telephone: string, dateOfBirth: string, gender: Gender, wing: Wings, room: Room
}

type updatePatient = {
    patient_id: number, name: string, telephone: string, dateOfBirth: string, gender: Gender, wing: Wings, room: Room
}

type indexPatient = { wing?: Wings, gender?: Gender, room?: Room }


export interface IPatientRepository {
    create(props: createPatient): Promise<any>;
    update(props: updatePatient): Promise<any>;
    index(props: indexPatient): Promise<any>;
    show(props: {patient_id?: number, name?: string}): Promise<any>;
    delete(patient_id: number): Promise<any>;
    findById(patient_id:number): Promise<any>;
    findByName(name: string): Promise<any>;
    findByDateOfBirth(dateOfBirth: string): Promise<any>;
}

export interface IPatientRepositoryInMemory {
    create(props: createPatient): any;
    update(props: updatePatient): any;
    index(props: indexPatient): any[];
    show(props: {patient_id?: number, name?: string}): any;
    delete(patient_id: number): void;
    findById(patient_id:number): any;
    findByName(name: string): any;
    findByDateOfBirth(dateOfBirth: string): any;
}