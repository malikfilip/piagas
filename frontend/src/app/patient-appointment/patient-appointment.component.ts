import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/userModer';
import { Appointment } from '../models/appointment';
import { PatientService } from '../services/patient.service';
import { Report } from '../models/report';
import { UserService } from '../services/user.service';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';
import * as QRCode from 'qrcode-generator'
import { Router } from '@angular/router';





@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {

  constructor(private pService: PatientService, private uService: UserService,private rt:Router) { }

  @ViewChild('exportAll', { static: false }) el!: ElementRef;

  user: User = JSON.parse(sessionStorage.getItem('user'))
  ngOnInit(): void {
    this.getAppointments();
    this.getJoin();
    if(this.user.type != 'patient')this.rt.navigate(['']);
  }

  appointments: any[] = [];
  reports: any[] = [];
  reportExport;
  showExportAll = false;
  showExportOne = false;
  getAppointments() {
    this.pService.getAppointments(this.user.username,this.getTime()).subscribe((tmp: any[]) => {
      if (tmp) {
        tmp.sort((a1: any, a2: any) => {
          if (a1.start < a2.start) return -1
          else if (a1.start > a2.start) return 1
          else return 0
        })
        this.appointments = tmp
      }
      else alert("Unexpected error occured.")

    })
  }



  cancel(id) {
    this.pService.cancelAppointment(id).subscribe(() => { this.ngOnInit() })
  }

  getJoin() {
    this.pService.join(this.user.username).subscribe((tmp: any[]) => {
      if (tmp) {
        tmp.sort((r1: any, r2: any) => {
          if (r1.date < r2.date) return 1
          else if (r1.date > r2.date) return -1
          else return 0
        })
        this.reports = tmp
      }
      else alert("Unexpected error occurred.")


    })
  }

  export() { 
    const content = document.getElementById(this.showExportAll ? 'exportAll' : 'exportOne') as HTMLElement;
    html2canvas(content, {}).then(canvas => {
      const imgContent = canvas.toDataURL('image/png');
      //console.log(imgContent); ovo je link ga slici izvestaja
      
      const pdfWidth = 210;//in milimeters
      const pdfHeight = 297;

      const canvasHeight = canvas.height*pdfWidth/canvas.width

      const pdf = new jsPDF('p', 'mm', 'a4',true);
      pdf.addImage(imgContent,'PNG',0,0,pdfWidth,this.showExportAll ? canvasHeight : pdfHeight, '','FAST');
      this.pService.upload(pdf.output()).subscribe((x)=>
     {
      
      let link = "http://localhost:4000/reports/"  + x['path']

      let qrcodeReport = this.generateQrcode(link);

      this.pService.sendMail(link,qrcodeReport,this.user.mail).subscribe(()=>{alert('Report has been sent to you e-mail address.'),this.cancelExport()})
      
    });
      
      

    })
  }
  exportAll() {
    this.showExportOne=false;
    this.showExportAll=true;
  }
  cancelExport(){
    this.showExportAll = this.showExportOne = false;
  }
  exportOne(report){
    this.showExportAll = false;
    this.showExportOne = true
    this.reportExport=report;
    
  }
   async generateQrcode(link):Promise<string>{
    const reportQr = QRCode(0,'L');
    reportQr.addData(link);
    reportQr.make();

    const returnQr = reportQr.createDataURL();


    return returnQr;

  }
  getTime(){
    let tmp = new Date();
    let day = tmp.getDate()
    let month = tmp.getMonth()+1
    let year = tmp.getFullYear()
    let mins = tmp.getMinutes()
    let hours = tmp.getHours();
  
    return (year + '-' + (month < 10 ? `0${month}` : month.toString()) + '-' + (day < 10 ? `0${day}` : day.toString())+"|"
    +  ((hours < 10 ? `0${hours}` : hours.toString()) + ':' + (mins < 10 ? `0${mins}` : mins.toString())))
  }

}
