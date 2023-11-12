import PatientUpdateService from "./PatientUpdateService";
import PatientCreateService from "./PatientCreateService";
import PatientRepositoryInMemory from "../../repositories/PatientRepositoryInMemory";

describe('Patient Update Service', () => {
    let patientRepositoryInMemory:any = null;
    let patientUpdateService:any = null;
    let patientCreateService:any = null;

    beforeEach(()  => {
        patientRepositoryInMemory = new PatientRepositoryInMemory()

        patientUpdateService = new PatientUpdateService(patientRepositoryInMemory)
        patientCreateService = new PatientCreateService(patientRepositoryInMemory)
    })

    it("Patient should be updated!", async () => {
        const patient1 = {
            name: "User Teste To Update",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patient2 = {
            name: "User Teste To Update 2",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'A',
            room: 2,
            dateOfBirth: '08/04/1995',
        }

        const patientCreated1 = await patientCreateService.execute(patient1)
        const patientCreated2 = await patientCreateService.execute(patient2)

        const patient1up = {
            patient_id: patientCreated1.id,
            name: "User Teste To Update",
            telephone: "84981011234",
            gender: 'feminino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }
        
        const patient2up = {
            patient_id: patientCreated2.id,
            name: "User Teste To Update 2",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 5,
            dateOfBirth: '08/04/1995',
        }
        
        const patientUpdated1 = await patientUpdateService.execute(patient1up)
        const patientUpdated2 = await patientUpdateService.execute(patient2up)
        
        expect(patientUpdated1.telephone).not.toEqual(patient1.telephone)
        expect(patientUpdated2.wing).not.toEqual(patient2.wing)
    })

    it("Patient id should exist", async () => {
        const patient = {
            name: "User Teste To Update",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patientC = await patientCreateService.execute(patient)

        const patientUp = {
            patient_id: 20,
            name: "User Teste To Update",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 5,
            dateOfBirth: '08/04/95',
        }

        await expect(patientUpdateService.execute(patientUp)).rejects.toEqual('Paciente não encontrado')
    })

    it("Patient date of birth should be at the DD/MM/YYYY format", async () => {
        const patient = {
            name: "User Teste To Update",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patientC = await patientCreateService.execute(patient)

        const patientUp = {
            patient_id: patientC.id,
            name: "User Teste To Update",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 5,
            dateOfBirth: '08/04/95',
        }

        await expect(patientUpdateService.execute(patientUp)).rejects.toEqual('Digite uma data de nascimento válida, no formato: DD/MM/AAAA')
    })

    it("Patient gender should be 'masculino' ou 'feminino'", async () => {
        const patient = {
            name: "User Teste To Update",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patientC = await patientCreateService.execute(patient)

        const patientUp = {
            patient_id: patientC.id,
            name: "User Teste To Update",
            telephone: "84981015335",
            gender: 'masc',
            wing: 'B',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientUpdateService.execute(patientUp)).rejects.toEqual('Digite um gênero válido: masculino ou feminino.')
    })

    it("Patient wing should be 'A' ou 'B'", async () => {
        const patient = {
            name: "User Teste To Update",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patientC = await patientCreateService.execute(patient)

        const patientUp = {
            patient_id: patientC.id,
            name: "User Teste To Update",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'D',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientUpdateService.execute(patientUp)).rejects.toEqual('Digite uma ala válida: A ou B.')
    })

    it("Patient room should be inner 1-9", async () => {
        const patient = {
            name: "User Teste To Update",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patientC = await patientCreateService.execute(patient)

        const patientUp = {
            patient_id: patientC.id,
            name: "User Teste To Update",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 12,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientUpdateService.execute(patientUp)).rejects.toEqual('Digite um quarto válido: 1 a 9.')
    })

    it("Name and Date of Birth shouldn't in use by another patient", async() => {
        const patient1 = {
            name: "User Teste To Update",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patient2 = {
            name: "User Teste To Update 2",
            telephone: "84981203907",
            gender: 'feminino',
            wing: 'B',
            room: 3,
            dateOfBirth: '08/05/1995',
        }

        await patientCreateService.execute(patient1)
        const patient2c = await patientCreateService.execute(patient2)
        
        const patient2up = {
            patient_id: patient2c.id,
            name: "User Teste To Update",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 5,
            dateOfBirth: '08/04/1995',
        }


        await expect(patientUpdateService.execute(patient2up)).rejects.toEqual("Paciente já cadastrado, com mesmo nome e data de nascimento")
    })
})