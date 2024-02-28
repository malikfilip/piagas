import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { User } from '../models/userModer';
import { ManagerService } from '../services/manager.service';
import { Specialization } from '../models/specialization';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private renderer: Renderer2, private mService:ManagerService,private dService:DoctorService,private rt:Router) { }

  users : User[]
  specializations: Specialization[]
  target : User
  user:User  = JSON.parse(sessionStorage.getItem('user'))
  
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-image', 'url("assets/manager.jpg")');
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.getUsers();
    this.getSpec();
    if(this.user.type != 'manager')this.rt.navigate([''])
  }

  showRegister = true;
 

  regPicture;

  username:string;
  password:string;
  confirm:string
  name:string;
  lastname:string;
  address:string;
  phone:string;
  mail:string;
  licence:string;
  spec:string;
  room:string;

  error:string=''
  errorUser=''
  errorMail=''
  



  getUsers(){
    this.mService.getUsers().subscribe((x:User[])=>this.users=x)
  }
  regex(text): boolean {
    var pattern1 = new RegExp(/^(?!.*(.)\1)(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,14}$/);
    var patter2 = new RegExp(/^[a-zA-Z].*$/)
    return (pattern1.test(text) && patter2.test(text))
  }
  addPicture(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () =>{
          if(img.width > 300 || img.height > 300 || img.width < 100 || img.height < 100){
            alert("Picture resolution does not meet the requirements ")
    
          }
          else
          {
            this.regPicture = event.target.result;
          }  
        }
        img.src = event.target.result
      }
    }
  }

  getSpec(){
    this.mService.getSpecs().subscribe((x:Specialization[])=>this.specializations=x)
  }
  register(){
    {

      this.mService.register(this.username, this.password, this.name, this.lastname, this.address, this.phone, this.mail, this.regPicture,this.licence,this.spec,this.room).subscribe(res => {
        this.errorUser = res['errorUser'], this.errorMail = res['errorMail'], this.error = "";
        if (this.errorMail == "" && this.errorUser == "") {
          this.username=this.password=this.confirm=this.name=this.lastname=this.address=this.phone=this.mail=this.licence=this.spec=this.room=this.regPicture=''
          this.ngOnInit(),alert('Doctor added')
        }
        else if (this.errorMail == "" && this.errorUser != "") this.error = "Username is already taken !"
        else if (this.errorMail != "" && this.errorUser == "") this.error = "E-mail is already taken !"
        else this.error='Both e-mail and username are taken !'
      })
      
    }
  }

  updateUser(target:User){
    this.target=target;
    this.showRegister = false
  }
  cancelUpdate(){
    this.username=this.password=this.confirm=this.name=this.lastname=this.address=this.phone=this.mail=this.licence=this.spec=this.room=this.regPicture='' 
    this.showRegister = true;
  }
  update(){
    if(this.name||this.lastname||this.phone||this.address||this.spec||this.regPicture||this.licence||this.mail){
      this.dService.update(this.target.username, this.name ? this.name : this.target.name, this.lastname ? this.lastname : this.target.lastname,
        this.phone ? this.phone : this.target.phone,
        this.address ? this.address : this.target.address,this.regPicture ? this.regPicture : this.target.picture,
        this.spec ? this.spec : this.target.spec,this.licence ? this.licence : this.target.licence,this.mail ? this.mail : this.target.mail).subscribe((tmp)=>{


    this.username=this.password=this.confirm=this.name=this.lastname=this.address=this.phone=this.mail=this.licence=this.spec=this.room=this.regPicture=''      
    this.ngOnInit();
          
      })}
      this.showRegister = true;
  }
  delete(target:User){
    this.mService.delete(target.username).subscribe(()=>this.ngOnInit())
  }


}
