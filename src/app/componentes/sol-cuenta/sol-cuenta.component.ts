import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { SqlService } from 'src/app/servicios/sql.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-sol-cuenta',
  templateUrl: './sol-cuenta.component.html',
  styleUrls: ['./sol-cuenta.component.css'],
})
export class SolCuentaComponent {
  name: string;
  age: number;
  fecha: string;
  usuario: string;
  cantPeso: number;
  identificadorEnvio;

  tableData;
  displayedColumns: string[] = [
    'id_peso',
    'identificador_envio',
    'cant_peso',
    'usuario',
    'fecha',
    'detalle'
  ];



  constructor(
    private sqlService: SqlService,
    private authService: AuthService
    
  ) {}

  ngOnInit() {
    this.traer_datos();
  }

  submit() {
    this.sqlService
    .postData('valida_peso', {
      p_identificadorEnvio: this.identificadorEnvio
    })
    .subscribe((data) => {
      if(data[0].resp == 'Si'){
          this.sqlService
          .postData_peso('INSERTARPESO', {
            p_identificadorEnvio: this.identificadorEnvio,
            p_cantPeso: this.cantPeso,
            p_usuario: this.usuario,
          })
          .subscribe((data) => {
              this.sqlService
              .postData('inserta_peso', {
                p_identificadorEnvio: this.identificadorEnvio,
                p_cantPeso: this.cantPeso,
              })
              .subscribe((data) => {
                if(data[0].resp == 'Si'){
                  this.traer_datos();
                }else{
                  alert("Existen problemas con los datos ingresados, valida que el codigo es correcto y que no se ha realizado pesaje anteriormente.")
                }
              });
      });
      }else{
        alert("Existen problemas con los datos ingresados, valida que el codigo es correcto y que no se ha realizado pesaje anteriormente.")
      }
    });
  }

  traer_datos() {
    this.sqlService.getData_peso('MOSTRAR').subscribe((resp) => {
      this.tableData = resp;
    });
  }


  

  generatePDF(id:string, peso:string, fecha:string, id_peso_cabal:string) {     
    var docDefinition = {
      watermark: { text: 'PESO CABAL, S.A.', color: 'blue', opacity: 0.3, bold: true, italics: false },
      content: [
        { text: 'Peso Cabal', style: 'subheader' },
        'Peso cabal certifica que el vehiculo que a continuación se detalla paso por los controles de peso cabal y los detalles son los siguientes:',
        {
          style: 'tableExample',
          color: '#444',
          table: {
            widths: [200, 'auto', 'auto'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [{ text: 'Identificador del envio', style: 'tableHeader', colSpan: 2, alignment: 'Left' }, {}, { text: id.toString(), style: 'tableHeader', alignment: 'Right' }],
              [{ text: 'Peso en libras:', style: 'tableHeader', colSpan: 2, alignment: 'Left' }, {}, { text: peso.toString(), style: 'tableHeader', alignment: 'Right' }],
              [{ text: 'Fecha de pesaje', style: 'tableHeader', colSpan: 2, alignment: 'Left' }, {}, { text: fecha.toString(), style: 'tableHeader', alignment: 'Right' }],
              [{ text: 'Identificador en peso cabal', style: 'tableHeader', colSpan: 2, alignment: 'Left' }, {}, { text: id_peso_cabal.toString(), style: 'tableHeader', alignment: 'Right' }]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      },
      patterns: {
        stripe45d: {
          boundingBox: [1, 1, 4, 4],
          xStep: 3,
          yStep: 3,
          pattern: '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s'
        }
      }
    };
    
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    console.log( id + " imprimiremos esto: " + docDefinition.content)
    pdfDocGenerator.download(id.toString() + '.pdf');  // Nombre del archivo de salida
  }
  

}
