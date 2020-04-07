import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  personForm = this.formBuilder.group({
    id: [],
    name: [null, Validators.compose([
      Validators.required, Validators.maxLength(255)
    ])],
    gender: [null],
    email: [null, Validators.email],
    birthDate: [moment(), Validators.required],
    birthPlace: [null, Validators.maxLength(255)],
    nationality: ['', Validators.maxLength(255)],
    cpf: ['', Validators.compose([
      Validators.required, Validators.pattern(/\/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)
    ])]
  });

  placeHolder = moment.localeData().longDateFormat('L');

  keepDropDownOpen(event: Event) {
    event.stopPropagation();
  }

  ngOnInit(): void {
  }

  submit() {

  }

}
