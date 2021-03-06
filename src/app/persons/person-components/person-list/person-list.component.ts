import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PERSON_LIST_COLUMNS } from './person-list-columns';
import { DataTableAction } from '../../../shared/data-table/data-table.component';
import { PersonFilterModel, PersonModel } from '../../../models/person-model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { YesNoModalComponent, YesNoModalConfig } from '../../../shared/yes-no-modal/yes-no-modal.component';
import { PersonService } from '../../../services/person.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private router: Router,
              private personService: PersonService,
              private toastService: ToastService,
              private modalService: NgbModal) { }

  @ViewChild('personListTable') personListTable;

  @Input() filter: PersonFilterModel;
  TABLE_URL = environment.URL_PERSON + '/search/page';
  TABLE_COLUMNS = PERSON_LIST_COLUMNS;
  TABLE_ACTIONS: Array<DataTableAction> = [
    {
      key: 1,
      action: (data) => this.navigateToEdit(data),
      icon: 'fa fa-pencil-square-o',
      class: 'btn btn-secondary',
      tooltip: 'Editar'
    },
    {
      key: 2,
      action: (data) => this.remove(data),
      icon: 'fa fa-remove',
      class: 'btn btn-danger',
      tooltip: 'Remover'
    }
  ];

  navigateToEdit(data: PersonModel) {
    this.router.navigate(['/form', data.id]);
  }

  search() {
    this.personListTable.instanceTable.ajax.reload();
  }

  async remove(data: PersonModel) {
    const modalRef = this.modalService.open(YesNoModalComponent, {size: 'sm'});
    let yesNoModalConfig: YesNoModalConfig = new YesNoModalConfig();
    yesNoModalConfig = {...yesNoModalConfig, message: `Tem certeza que deseja remover o(a) ${data.name}?`};
    modalRef.componentInstance.yesNoModalConfig = yesNoModalConfig;

    const result = await modalRef.result;
    if (result) {
      await this.personService.delete(data.id);
      this.personListTable.instanceTable.ajax.reload();
      this.toastService.success(`Prontinho, removemos o(a): ${data.name}`);
    }
  }

  ngOnInit(): void {
  }

}
