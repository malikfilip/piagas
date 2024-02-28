import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { User } from '../models/userModer';
import { Req } from '../models/request';
import { ManagerService } from '../services/manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-req',
  templateUrl: './manager-req.component.html',
  styleUrls: ['./manager-req.component.css']
})
export class ManagerReqComponent implements OnInit {

  constructor(private renderer:Renderer2, private mService:ManagerService,private rt:Router) { }

  user:User = JSON.parse(sessionStorage.getItem('user'))  
  requests: Req[] = []
  branchReq : Req[] = [];
  ngOnInit(): void {
      this.renderer.setStyle(document.body, 'background-image', 'url("assets/manager.jpg")');
      this.renderer.setStyle(document.body, 'background-size', 'cover');
      this.getRequests();
      this.getBranchReq();
      if(this.user.type != 'manager')this.rt.navigate(['']);
  }
  getRequests(){
    this.mService.gerReq().subscribe((x:Req[])=>this.requests=x)
  }
  accept(req){
    this.mService.accept(req.username,req.password,req.name,req.lastname,req.phone,req.mail,
      req.address,req.picture,this.getTime(),"reg"+Date.now(),req._id).subscribe(()=>{this.ngOnInit()})
  }
  decline(req){
    this.mService.decline(req.username,req.mail,req._id).subscribe(()=>this.ngOnInit())
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

  getBranchReq(){
    this.mService.branchRequest().subscribe((x:Req[])=>this.branchReq=x)
  }

  acceptBranch(req){
    this.mService.branchAccept(req.name,req.duration,req.price,req.spec,req._id).subscribe(()=>this.ngOnInit())
  }
  declineBranch(req){
    this.mService.branchDecline(req._id).subscribe(()=>this.ngOnInit())
  }
}
