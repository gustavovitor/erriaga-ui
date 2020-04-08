import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonFormComponent } from '../../person-components/person-form/person-form.component';

@Component({
  selector: 'app-person-form-page',
  templateUrl: './person-form-page.component.html',
  styleUrls: ['./person-form-page.component.scss']
})
export class PersonFormPageComponent implements OnInit {

  constructor(public router: Router) { }

  @ViewChild('appPersonForm') appPersonForm: PersonFormComponent;

  get isEdit(): boolean {
    if (this.appPersonForm) {
      return this.appPersonForm.isEdit;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }

}
