import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonFilterModel } from '../../../models/person-model';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-person-filter-form',
  templateUrl: './person-filter-form.component.html',
  styleUrls: ['./person-filter-form.component.scss']
})
export class PersonFilterFormComponent implements OnInit, AfterViewInit {

  @Input() filter: PersonFilterModel;

  placeHolder = moment.localeData().longDateFormat('L');

  @Output() whenSearch = new EventEmitter();

  private isStartPickerOpen = false;
  private isEndPickerOpen = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const startDatePickerParent = $('button.start-date[data-toggle="dropdown"]', this.elementRef.nativeElement).parent();
    startDatePickerParent.on('show.bs.dropdown', () => {
      this.isStartPickerOpen = true;
    });
    startDatePickerParent.on('hide.bs.dropdown', () => {
      this.isStartPickerOpen = false;
    });

    const endDatePickerParent = $('button.end-date[data-toggle="dropdown"]', this.elementRef.nativeElement).parent();
    endDatePickerParent.on('show.bs.dropdown', () => {
      this.isEndPickerOpen = true;
    });
    startDatePickerParent.on('hide.bs.dropdown', () => {
      this.isEndPickerOpen = false;
    });
  }


  search() {
    this.whenSearch.emit();
  }

  keepDropDownOpen(event: Event) {
    event.stopPropagation();
  }


}
