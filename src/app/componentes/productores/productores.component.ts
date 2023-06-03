import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { SqlService } from 'src/app/servicios/sql.service';

@Component({
  selector: 'app-productores',
  templateUrl: './productores.component.html',
  styleUrls: ['./productores.component.css'],
})
export class ProductoresComponent {
  name: string;
  age: number;
  identificadorEnvio;
  filteredData: any[];

  tableData;
  displayedColumns: string[] = [
    'id_peso',
    'identificador_envio',
    'cant_peso',
    'usuario',
    'fecha',
  ];
  constructor(
    private sqlService: SqlService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  submit() {
    this.sqlService
      .postData_peso('OBTENERPESO', {
        p_identificadorEnvio: this.identificadorEnvio,
      })
      .subscribe((data) => {
        this.tableData = data;
      });
  }
}
