import PatientShowService from "./PatientShowService";
import PatientCreateService from "./PatientCreateService";
import PatientRepositoryInMemory from "../../repositories/PatientRepositoryInMemory";

describe('Patient Show Service', () => {
    let patientRepositoryInMemory:any = null;
    let patientShowService:any = null;
    let patientCreateService:any = null;

    beforeEach(()  => {
        patientRepositoryInMemory = new PatientRepositoryInMemory()

        patientShowService = new PatientShowService(patientRepositoryInMemory)
        patientCreateService = new PatientCreateService(patientRepositoryInMemory)
    })

    it("Patient should be returned to show!", async () => {

        const patient = {
            name: "User Teste To Update",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patient2 = {
            name: "User Teste To Update 4",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patientCreated1 = await patientCreateService.execute(patient)
        const patientCreated2 = await patientCreateService.execute(patient2)

        const showPatient1 = await patientShowService.execute({patient_id: patientCreated1.id})
        const showPatient2 = await patientShowService.execute({name: patientCreated2.name})

        expect(showPatient1).toHaveProperty('name')
        expect(showPatient2).toHaveProperty('telephone')
    })

    it("Should inform id or name of the patient", async () => {
        expect(patientShowService.execute({})).rejects.toEqual('Deve ser informado o id ou nome do paciente')
    })
})