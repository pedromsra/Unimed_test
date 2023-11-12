import PatientDeleteService from "./PatientDeleteService";
import PatientCreateService from "./PatientCreateService";
import PatientRepositoryInMemory from "../../repositories/PatientRepositoryInMemory";

describe('Patient Delete Service', () => {
    let patientRepositoryInMemory:any = null;
    let patientDeleteService:any = null;
    let patientCreateService:any = null;

    beforeEach(()  => {
        patientRepositoryInMemory = new PatientRepositoryInMemory()

        patientDeleteService = new PatientDeleteService(patientRepositoryInMemory)
        patientCreateService = new PatientCreateService(patientRepositoryInMemory)
    })

    it("Patient should be Deleted!", async () => {
        const patient1 = {
            name: "User Teste To Delete",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 1,
            dateOfBirth: '08/04/1995',
        }

        const patient2 = {
            name: "User Teste To Delete 2",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 1,
            dateOfBirth: '08/04/1995',
        }

        const patient3 = {
            name: "User Teste To Delete 3",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 2,
            dateOfBirth: '08/04/1995',
        }

        const patient4 = {
            name: "User Teste To Delete 4",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 2,
            dateOfBirth: '08/04/1995',
        }

        const patient5 = {
            name: "User Teste To Delete 5",
            telephone: "84981015334",
            gender: 'feminino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patient6 = {
            name: "User Teste To Delete 6",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const createdPatient1 = await patientCreateService.execute(patient1)
        const createdPatient2 = await patientCreateService.execute(patient2)
        const createdPatient3 = await patientCreateService.execute(patient3)
        const createdPatient4 = await patientCreateService.execute(patient4)
        const createdPatient5 = await patientCreateService.execute(patient5)
        const createdPatient6 = await patientCreateService.execute(patient6)

        await patientDeleteService.execute(createdPatient3.id)

        const checkIfDeleted = patientRepositoryInMemory.findById(createdPatient3.id)
        
        expect(checkIfDeleted).toBeFalsy()
    })
})