import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  constructor(private service:PatientService,private rt:Router) { }

  user:User;
  show = 0
  newName:string;
  newLastname:string;
  newPhone:string;
  newAddress:string;
  newMail:string;
  newPicture:object;

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    if(this.user.type != 'patient')this.rt.navigate(['']);
  }
  edit(){
    this.show = 1;
  }
  confirm(){
    if(this.newName||this.newLastname||this.newPhone||this.newAddress||this.newMail||this.newPicture){
    this.service.update(this.user.username, this.newName ? this.newName : this.user.name, this.newLastname ? this.newLastname : this.user.lastname,
      this.newPhone ? this.newPhone : this.user.phone,this.newMail ? this.newMail : this.user.mail,
      this.newAddress ? this.newAddress : this.user.address,this.newPicture ? this.newPicture : this.user.picture).subscribe((tmp)=>{
        sessionStorage.setItem('user',JSON.stringify(tmp));
        this.ngOnInit();
        
    })}
    this.show = 0
  }
  fun(){alert('SEWEY')}
  addPicture(event){
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.newPicture = event.target.result;
  }}}

}
