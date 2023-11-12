import PatientCreateService from "./PatientCreateService";
import PatientRepositoryInMemory from "../../repositories/PatientRepositoryInMemory";

describe('Patient Create Service', () => {
    let patientRepositoryInMemory:any = null;
    let patientCreateService:any = null;

    beforeEach(()  => {
        patientRepositoryInMemory = new PatientRepositoryInMemory()

        patientCreateService = new PatientCreateService(patientRepositoryInMemory)
    })

    it("Patient should be created!", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patientCreated = await patientCreateService.execute(patient)

        expect(patientCreated).toHaveProperty('id')
    })

    it("Patient should have a name", async () => {
        const patient = {
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('O nome do paciente deve ser informado')
    })

    it("Patient should have a telephone", async () => {
        const patient = {
            name: "User Teste To Create",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('O telefone do pasciente deve ser informado')
    })
    
    it("Patient should have a date of birth", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('A date de nascimento do paciente deve ser informada')
    })

    it("Patient should have a gender", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('O genero do pasciente deve ser informado')
    })

    it("Patient should have a wing", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masculino',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('A ala do pasciente deve ser iformada')
    })

    it("Patient should have a room", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            dateOfBirth: '08/04/1995',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('O quarto do pasciente deve ser informado')
    })

    it("Patient date of birth should be at the DD/MM/YYYY format", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/95',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('Digite uma data de nascimento válida, no formato: DD/MM/AAAA')
    })

    it("Patient gender should be 'masculino' ou 'feminino'", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masc',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('Digite um gênero válido: masculino ou feminino.')
    })

    it("Patient wing should be 'A' ou 'B'", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'D',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('Digite uma ala válida: A ou B.')
    })

    it("Patient room should be inner 1-9", async () => {
        const patient = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 12,
            dateOfBirth: '08/04/1995',
        }

        await expect(patientCreateService.execute(patient)).rejects.toEqual('Digite um quarto válido: 1 a 9.')
    })

    it("Name and Date of Birth shouldn't in use by another patient", async() => {
        const patient1 = {
            name: "User Teste To Create",
            telephone: "84981015334",
            gender: 'masculino',
            wing: 'A',
            room: 5,
            dateOfBirth: '08/04/1995',
        }

        const patient2 = {
            name: "User Teste To Create",
            telephone: "84981203907",
            gender: 'feminino',
            wing: 'B',
            room: 3,
            dateOfBirth: '08/04/1995',
        }

        await patientCreateService.execute(patient1)

        await expect(patientCreateService.execute(patient2)).rejects.toEqual("Paciente já cadastrado, com mesmo nome e data de nascimento")
    })
})