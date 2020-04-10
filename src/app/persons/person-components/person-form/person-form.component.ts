import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonModel } from '../../../models/person-model';
import * as moment from 'moment';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  birthDateModel;

  get isEdit(): boolean {
    return this.personForm.get('id').value != null;
  }

  personForm = this.formBuilder.group({
    id: [],
    name: [null, Validators.compose([
      Validators.required, Validators.maxLength(255)
    ])],
    gender: [null],
    email: [null, Validators.email],
    birthDate: [moment().toDate(), Validators.required],
    birthPlace: [null, Validators.maxLength(255)],
    nationality: ['', Validators.maxLength(255)],
    cpf: ['', Validators.compose([
      Validators.required, Validators.pattern(/\/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)
    ])]
  });

  keepDropDownOpen(event: Event) {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.checkRouteParams();
  }

  async checkRouteParams() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      const personModel: PersonModel = await this.personService.findById(id);
      if (personModel) {
        this.birthDateModel = moment(personModel.birthDate).toDate();
        this.personForm.patchValue(personModel);
      }
    }
  }

  async submit() {
    try {
      this.personForm.disable();
      if (!this.isEdit) {
        // Insert
        await this.personService.insert(this.personForm.value);
        await this.router.navigate(['']);
      } else {
        // Update
        await this.personService.patch(this.personForm.value);
        await this.router.navigate(['']);
      }
    } catch (e) {
      this.personForm.enable();
    }
  }

  updateForm() {
    this.personForm.get('birthDate').setValue(this.birthDateModel);
  }
}
