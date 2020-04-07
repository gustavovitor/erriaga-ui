import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonFilterModel } from '../../../models/person.model';

@Component({
  selector: 'app-person-filter-form',
  templateUrl: './person-filter-form.component.html',
  styleUrls: ['./person-filter-form.component.scss']
})
export class PersonFilterFormComponent implements OnInit {

  filter = new PersonFilterModel();
  @Output() whenSearch = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    this.whenSearch.emit(this.filter);
  }
}
