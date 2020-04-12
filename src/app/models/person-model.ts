export class PersonModel {
  id: number;
  name: string;
  gender: string;
  email: string;
  birthDate: Date;
  birthPlace: string;
  nationality: string;
  cpf: string;
}

export class PersonFilterModel extends PersonModel {
  birthDateStart: Date;
  birthDateEnd: Date;

  registerDateStart: Date;
  registerDateEnd: Date;

  modifiedDateStart: Date;
  modifiedDateEnd: Date;
}

