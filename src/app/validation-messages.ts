import {ErrorMessage} from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: requiredFormat
  }, {
    error: 'pattern',
    format: pattern
  }, {
    error: 'email',
    format: emailFormat
  }, {
    error: 'senhasNaoCoincidem',
    format: senhasNaoCoincidemFormat
  }, {
    error: 'minlength',
    format: minLengthFormat
  },  {
    error: 'maxlength',
    format: maxLengthFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `${label} é obrigatório(a)!`;
}

export function pattern(label: string, error: any): string {
  return `${label} está inválido!`;
}

export function emailFormat(label: string, error: any): string {
  return `Isso não me parece um email válido.`;
}

export function minLengthFormat(label: string, error: any): string {
  return `${label} precisa ter no mínimo ${error.requiredLength} caracteres.`;
}

export function maxLengthFormat(label: string, error: any): string {
  return `${label} só pode ter no máximo ${error.requiredLength} caracteres.`;
}

export function senhasNaoCoincidemFormat(): string {
  return `As senhas não são iguais.`;
}
