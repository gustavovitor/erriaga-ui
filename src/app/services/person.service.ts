import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PersonModel } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) {
  }

  URL = environment.URL_PERSON;

  findById(id: number): Promise<PersonModel> {
    return this.httpClient.get<PersonModel>(`${this.URL}/${id}`).toPromise();
  }

  insert(person: PersonModel): Promise<PersonModel> {
    return this.httpClient.post<PersonModel>(this.URL, person).toPromise();
  }

  patch(person: PersonModel): Promise<PersonModel> {
    return this.httpClient.patch<PersonModel>(`${this.URL}/${person.id}`, person).toPromise();
  }

}
