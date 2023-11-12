import PatientIndexService from "./PatientIndexService";
import PatientCreateService from "./PatientCreateService";
import PatientRepositoryInMemory from "../../repositories/PatientRepositoryInMemory";

describe('Patient Index Service', () => {
    let patientRepositoryInMemory:any = null;
    let patientIndexService:any = null;
    let patientCreateService:any = null;

    beforeEach(()  => {
        patientRepositoryInMemory = new PatientRepositoryInMemory()

        patientIndexService = new PatientIndexService(patientRepositoryInMemory)
        patientCreateService = new PatientCreateService(patientRepositoryInMemory)
    })

    it("Patient should be Indexd!", async () => {
        const patient1 = {
            name: "User Teste To Index",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 1,
            dateOfBirth: '08/04/1995',
        }

        const patient2 = {
            name: "User Teste To Index 2",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 1,
            dateOfBirth: '08/04/1995',
        }

        const patient3 = {
            name: "User Teste To Index 3",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 2,
            dateOfBirth: '08/04/1995',
        }

        const patient4 = {
            name: "User Teste To Index 4",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 2,
            dateOfBirth: '08/04/1995',
        }

        const patient5 = {
            name: "User Teste To Index 5",
            telephone: "84981015334",
            gender: 'feminino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patient6 = {
            name: "User Teste To Index 6",
            telephone: "84981015335",
            gender: 'feminino',
            wing: 'B',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await patientCreateService.execute(patient1)
        await patientCreateService.execute(patient2)
        await patientCreateService.execute(patient3)
        await patientCreateService.execute(patient4)
        await patientCreateService.execute(patient5)
        await patientCreateService.execute(patient6)

        const index = await patientIndexService.execute({})
        const indexWing = await patientIndexService.execute({wing: 'A'})
        const indexRoom = await patientIndexService.execute({room: 2})
        const indexGender = await patientIndexService.execute({gender: 'feminino'})
        
        expect(index.length).toEqual(6)
        expect(indexWing.length).toEqual(3)
        expect(indexRoom.length).toEqual(2)
        expect(indexGender.length).toEqual(4)
    })

    it("Patient gender should be 'masculino' ou 'feminino'", async () => {
        await expect(patientIndexService.execute({gender: 'masc'})).rejects.toEqual('Digite um gênero válido: masculino ou feminino.')
    })

    it("Patient wing should be 'A' ou 'B'", async () => {
        await expect(patientIndexService.execute({wing: 'D'})).rejects.toEqual('Digite uma ala válida: A ou B.')
    })

    it("Patient room should be inner 1-9", async () => {
        await expect(patientIndexService.execute({room: 13})).rejects.toEqual('Digite um quarto válido: 1 a 9.')
    })
})