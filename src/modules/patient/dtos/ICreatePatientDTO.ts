interface ICreatePatientDTO {
    name: string;
    date_of_birth: Date;
    phone_number: string;
    cpf: string;
    cep: string;
    address: string;
    gender: 'male' | 'female';
}
  
export default ICreatePatientDTO;
