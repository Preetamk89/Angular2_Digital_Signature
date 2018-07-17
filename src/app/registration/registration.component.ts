import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;

  

  public firstName : string = '';
  public lastName: string = '';
  public Email: string = '';
  public comments: string = '';
  public currentDate: Date = new Date();
  public options: Object = {
    'backgroundColor': 'rgb(222, 224, 226)'
  };
  public signature: any = null;
  constructor() {
  
   }

  ngOnInit() {
  }
  public drawBegin(): void {
    console.log('Begin Drawing');
  }

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL('image/jpeg',0.5);
  }
  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }

  public generatePDF(): void{
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var dd = { content: [
      {
        text: 'Registration Details',
        style: 'header'
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'First Name'
          },
          {
            text: this.firstName
          }
        ]
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Last Name'
          },
          {
            text: this.lastName
          }
        ]
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Email'
          },
          {
            text: this.Email
          }
        ]
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Comments'
          },
          {
            text: this.comments
          }
        ]
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Current Date'
          },
          {
            text: this.currentDate
          }
        ]
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Signature'
          },
          {
            image: this.signature,
            width: 200
          }
        ]
      }
    ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
  };
    pdfMake.createPdf(dd).download('digitalSignature.pdf');
  
  }
}
