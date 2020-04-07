import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-form-page',
  templateUrl: './person-form-page.component.html',
  styleUrls: ['./person-form-page.component.scss']
})
export class PersonFormPageComponent implements OnInit {

  constructor(public router: Router) { }



  ngOnInit(): void {
  }

}
