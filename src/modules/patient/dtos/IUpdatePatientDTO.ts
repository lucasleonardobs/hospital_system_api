interface IUpdatePatientDTO {
    cpf: string;
    name: string;
    date_of_birth: Date;
    phone_number: string;
    cep: string;
    address: string;
    gender: 'male' | 'female';
}
    
export default IUpdatePatientDTO;
