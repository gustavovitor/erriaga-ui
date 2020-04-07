import { Component, OnInit, ViewChild } from '@angular/core';
import { inOutOpacityAnimation } from '../../../shared/animations/animations';
import { PersonFilterModel } from '../../../models/person.model';
import { PersonListComponent } from '../../person-components/person-list/person-list.component';

@Component({
  selector: 'app-person-list-page',
  templateUrl: './person-list-page.component.html',
  styleUrls: ['./person-list-page.component.scss'],
  animations: [inOutOpacityAnimation]
})
export class PersonListPageComponent implements OnInit {

  @ViewChild('appPersonList', { static: true }) appPersonList: PersonListComponent;

  showFilters = false;

  constructor() { }

  ngOnInit(): void {
  }

  search(filter: PersonFilterModel) {
    this.appPersonList.search(filter);
  }

}
