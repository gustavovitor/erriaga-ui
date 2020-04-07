import { DataTableColumn } from '../../../shared/data-table/data-table.component';
import { AppEnumPipe } from '../../../shared/pipes/app-enum.pipe';
import { GENDER_ENUM_IMPL } from '../gender-enum-impl';
import { DatePipe } from '@angular/common';

export const PERSON_LIST_COLUMNS: Array<DataTableColumn> = [
  { data: 'id', name: 'Cód.' },
  { data: 'name', name: 'Nome' },
  {
    data: 'gender',
    name: 'Gênero',
    pipe: new AppEnumPipe(),
    pipeArgs: GENDER_ENUM_IMPL
  },
  {
    data: 'birthDate',
    name: 'Data de Nascimento',
    pipe: new DatePipe('en'),
    pipeArgs: 'dd/MM/yyyy'
  },
  { data: 'cpf', name: 'CPF', mask: '000.000.000-00' },
  { data: null, name: 'Ações' },
];
