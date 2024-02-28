import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { PatientService } from '../services/patient.service';
import { DoctorService } from '../services/doctor.service';
import { Specialization } from '../models/specialization';
import { Branch } from '../models/branch';
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private service:PatientService,private dService:DoctorService,private rt:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.getSpecializationList();
    if(this.user.type != 'doctor')this.rt.navigate(['']);
  }

  user : User;
  show = 0;
  newName:string;
  newLastname:string;
  newPhone:string;
  newAddress:string;
  newPicture:object;
  newLicence:string;
  newSpec:string;
  spec : any[] = [] 


  edit(){
    this.show = 1;
  }
  confirm(){
    if(this.newName||this.newLastname||this.newPhone||this.newAddress||this.newSpec||this.newPicture||this.newLicence){
    this.dService.update(this.user.username, this.newName ? this.newName : this.user.name, this.newLastname ? this.newLastname : this.user.lastname,
      this.newPhone ? this.newPhone : this.user.phone,
      this.newAddress ? this.newAddress : this.user.address,this.newPicture ? this.newPicture : this.user.picture,
      this.newSpec ? this.newSpec : this.user.spec,this.newLicence ? this.newLicence : this.user.licence,this.user.mail).subscribe((tmp)=>{
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

  getSpecializationList(){
    this.dService.getSpec(this.user.spec).subscribe((tmp:any)=>{
      //this.spec = tmp.branches;
      const actives = this.dService.getActive(this.user.username).subscribe((active:any)=>{
        let actives = active.map(x=>x.type)
        tmp.branches.forEach(x=>{
          if(actives.includes(x.name)) x.active=true
          else x.active = false
        })
        this.spec = tmp.branches
      })
    })
  }

  updateService(event:any,service:any){
   /* const target = event.target as HTMLInputElement;
    console.log(target.checked)*/
    if(event.target.checked){
      
      this.dService.addService(this.user.username,service).subscribe(()=>{this.ngOnInit()})
    }else{
  
      this.dService.removeService(this.user.username,service).subscribe(()=>{this.ngOnInit()})
    }
  }
}
