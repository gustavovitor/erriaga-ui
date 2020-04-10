import { Component, OnInit, ViewChild } from '@angular/core';
import { inOutOpacityAnimation } from '../../../shared/animations/animations';
import { PersonFilterModel } from '../../../models/person-model';
import { PersonListComponent } from '../../person-components/person-list/person-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list-page',
  templateUrl: './person-list-page.component.html',
  styleUrls: ['./person-list-page.component.scss'],
  animations: [inOutOpacityAnimation]
})
export class PersonListPageComponent implements OnInit {

  @ViewChild('appPersonList', { static: true }) appPersonList: PersonListComponent;

  filter = new PersonFilterModel();

  showFilters = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.appPersonList.search();
  }

}
