import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonFilterModel } from '../../../models/person.model';
import * as moment from 'moment';

@Component({
  selector: 'app-person-filter-form',
  templateUrl: './person-filter-form.component.html',
  styleUrls: ['./person-filter-form.component.scss']
})
export class PersonFilterFormComponent implements OnInit {

  @Input() filter: PersonFilterModel;

  placeHolder = moment.localeData().longDateFormat('L');

  @Output() whenSearch = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    this.whenSearch.emit();
  }

  keepDropDownOpen(event: Event) {
    event.stopPropagation();
  }


}
