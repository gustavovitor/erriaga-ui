import { AfterViewInit, Component, ElementRef, Input, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { MaskPipe } from 'ngx-mask';
import { AuthService } from '../../services/auth.service';

declare var $;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable', { static: false }) table: ElementRef;
  dataTable: any;
  dtOption: any;

  public instanceTable: any;

  @Input() pageable = true;
  @Input() url;
  @Input() search;
  @Input() columns: Array<DataTableColumn>;
  @Input() actions: Array<DataTableAction>;
  @Input() searching = false;

  buttons: Array<any>;

  constructor(private authService: AuthService,
              private ngxMask: MaskPipe) {
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.loadData();
  }

  public async loadData() {
    this.dtOption = {
      scrollY: '420px',
      columnDefs: this.extractColumnDefsMask(),
      language: {
        sEmptyTable: 'Nenhum registro encontrado',
        sInfo: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
        sInfoEmpty: 'Mostrando 0 até 0 de 0 registros',
        sInfoFiltered: '(Filtrados de _MAX_ registros)',
        sInfoPostFix: '',
        sInfoThousands: '.',
        sLengthMenu: '_MENU_ resultados por página',
        sLoadingRecords: 'Carregando...',
        sProcessing: 'Processando...',
        sZeroRecords: 'Nenhum registro encontrado',
        sSearch: 'Pesquisar',
        oPaginate: {
          sNext: 'Próximo',
          sPrevious: 'Anterior',
          sFirst: 'Primeiro',
          sLast: 'Último'
        },
        oAria: {
          sSortAscending: ': Ordenar colunas de forma ascendente',
          sSortDescending: ': Ordenar colunas de forma descendente'
        }
      },
      paging: true,
      ordering: false,
      info: false,
      searching: this.searching,
      processing: this.pageable,
      serverSide: this.pageable,
      lengthMenu: [[10, 25, 50, 99999], [10, 25, 50, 'Todos']],
      ajax: {
        dataSrc: this.pageable ? 'content' : '',
        url: this.url,
        type: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        beforeSend: (xhr: XMLHttpRequest) => {
          const token = this.authService.getValidAccessToken();
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        data: (params) => {
          if (this.pageable) {
            params.pageable = {
              page: params.start / params.length,
              size: params.length
            };
          }
          params.object = {
            ...this.search
          };
          return JSON.stringify(params);
        },
        dataFilter: (data) => {
          const json = JSON.parse(data);
          if (this.pageable) {
            json.recordsTotal = json.totalElements;
            json.recordsFiltered = json.totalElements;
          }
          return JSON.stringify(json);
        },
      },
      columns: this.columns
    };
    this.dataTable = $(this.table.nativeElement);
    this.instanceTable = this.dataTable.DataTable(this.dtOption);
    this.instanceTable.on('draw', () => this.updateActionButton());
    $.fn.dataTable.ext.errMode = 'throw';
  }

  extractColumnDefsMask() {
    return this.columns.map((x, index) => {
      if (x.renderFunc) {
        return {
          targets: index,
          data: x.data,
          render: x.renderFunc
        };
      }
      if (x.mask) {
        return {
          targets: index,
          data: x.data,
          render: (data, type, row, meta) => {
            return this.ngxMask.transform(data, x.mask);
          }
        };
      }
      if (x.pipe) {
        return {
          targets: index,
          data: x.data,
          render: (data, type, row, meta) => {
            return x.pipe.transform(data, x.pipeArgs);
          }
        };
      }
      if (x.data === null) {
        return this.extractColumnAction();
      }
      return {
        targets: index,
        data: x.data,
        render: (data, type, row, meta) => {
          return data;
        }
      };
    });
  }

  extractColumnAction() {
    this.buttons = [];
    return {
      targets: this.columns.findIndex(column => column.data === null),
      render: (data, type, row, meta) => {
        return this.actions.map(action => {
          const buttonElement = document.createElement('button');
          const id = Math.random();
          buttonElement.setAttribute('id', id.toString());
          buttonElement.setAttribute('class', 'btn-icon ' + action.class);
          buttonElement.setAttribute('actionKey', action.key.toString());
          buttonElement.setAttribute('data-toggle', 'tooltip');
          buttonElement.setAttribute('data-placement', 'top');
          buttonElement.setAttribute('data-skin-class', 'tooltip-base');
          buttonElement.setAttribute('title', action.tooltip);

          const icon = document.createElement('i');
          icon.setAttribute('class', action.icon);

          buttonElement.appendChild(icon);
          this.buttons.push({ id, actionKey: action.key, data });
          return buttonElement.outerHTML;
        }).toString().replace(',', '&nbsp;');
      }
    };
  }

  updateActionButton() {
    this.buttons.forEach(button => {
      if (document.getElementById(button.id.toString())) {
        document.getElementById(button.id.toString())
          .parentNode.replaceChild(document.getElementById(button.id.toString())
          .cloneNode(true), document.getElementById(button.id.toString()));

        document.getElementById(button.id.toString())
          .addEventListener('click', () =>
            this.actions[this.actions.findIndex(x => x.key === button.actionKey)].action(button.data));
      }
    });
  }

}

export class DataTableColumn {
  name: string;
  data: string;
  mask?: string;
  pipe?: PipeTransform;
  pipeArgs?: any;
  renderFunc?: Function;
}

export class DataTableAction {
  key: number;
  id?: number;
  icon: string;
  action: Function;
  class: string;
  tooltip: string;
}
