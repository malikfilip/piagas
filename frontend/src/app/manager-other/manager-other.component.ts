import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { User } from '../models/userModer';
import { ManagerService } from '../services/manager.service';
import { Specialization } from '../models/specialization';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-other',
  templateUrl: './manager-other.component.html',
  styleUrls: ['./manager-other.component.css']
})
export class ManagerOtherComponent implements OnInit {

  constructor(private renderer:Renderer2,private mService:ManagerService,private rt:Router) { }

  user:User = JSON.parse(sessionStorage.getItem('user')) 
  spec:Specialization[] = []

  
  spezz:string;
  
  addBranchSpec:string;
  addBranch:string;
  addBranchPrice:number;
  addBranchDuration:number;

  editBranchSpec:string

  editBranch:any;
  editBranchDuration:number;
  editBranchPrice:number;
  editList= []

  deleteBranchSpec;
  deleteBranch;
  deleteList = []

  action:string;


  ngOnInit(): void {
      this.renderer.setStyle(document.body, 'background-image', 'url("assets/manager.jpg")');
      this.renderer.setStyle(document.body, 'background-size', 'cover');
      this.getSpec();
      if(this.user.type != 'manager' ||this.user == null)this.rt.navigate(['']);
  }
  getSpec(){
    this.mService.getSpecs().subscribe((x:Specialization[])=>this.spec=x)
  }

  getEditBranch(e){
    console.log(e.target.value)
    this.mService.branchList(e.target.value).subscribe((x:Specialization)=>this.editList = x.branches)
  }

  getDeleteBranch(e){
    this.mService.branchList(e.target.value).subscribe((x:Specialization)=>this.deleteList = x.branches)
  }

  specAdd(){
    if(this.spezz){
    this.mService.specAdd(this.spezz).subscribe(()=>{alert('Specialization added'),window.location.reload()})
  }}

  branchAdd(){

    if(!this.addBranch || this.addBranchPrice<0 || this.addBranchDuration<0 || !this.addBranchPrice){}
    else{this.mService.branchAdd(this.addBranch,this.addBranchDuration ? this.addBranchDuration : 0.5,this.addBranchPrice,this.addBranchSpec).subscribe(
      ()=>{alert('Branch added'),window.location.reload()}
      )
  }}

  branchEdit(){
    console.log(this.editBranch)
    if(!this.editBranch || (!this.editBranchPrice && !this.editBranchDuration) || this.editBranchPrice<0 || this.addBranchDuration<0 ) { }
    else{this.mService.branchEdit(this.editBranchSpec,this.editBranch.name,
      this.editBranchPrice ? this.editBranchPrice : this.editBranch.price ,this.editBranchDuration ? this.editBranchDuration : this.editBranch.duration,
      this.getTime(),this.editBranchPrice ? true : false).subscribe(
        ()=>{alert('Branch modified'),window.location.reload()}
        ) }
  }
  
  branchDelete(){
    this.mService.branchDelete(this.deleteBranchSpec,this.deleteBranch.name).subscribe(()=>{alert('Branch deleted'),window.location.reload()})
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

  actionFun(){
    this.mService.action(this.action,this.getTime()).subscribe(()=>{alert('Action added!'),window.location.reload()})
  }


}
