import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  update(un, nm, ln, ph, ml, ad, pic) {
    const data = {
      username: un,
      name: nm,
      lastname: ln,
      phone: ph,
      mail: ml,
      address: ad,
      picture: pic
    }
    return this.http.post('http://localhost:4000/patient/update', data)
  }
  search(nameParam, lastnameParam, specParam, roomParam) {
    const data = {
      nameParam: nameParam,
      lastnameParam: lastnameParam,
      specParam: specParam,
      roomParam: roomParam
    }
    return this.http.post('http://localhost:4000/patient/search', data)
  }
  getDoctor(un) {
    const data = {
      username: un
    }
    return this.http.post('http://localhost:4000/patient/doctor', data)
  }
  getServices(un) {
    const data = {
      doc: un
    }
    return this.http.post('http://localhost:4000/patient/service', data)
  }

  checkDate(doc) {
    const data = { doctor: doc }
    return this.http.post('http://localhost:4000/patient/check', data)
  }
  schedule(doc, pat, type, st, end, rm) {
    const data = {
      doctor: doc,
      patient: pat,
      type: type,
      start: st,
      end: end,
      room: rm
    }
    return this.http.post('http://localhost:4000/patient/schedule', data)
  }

  getAppointments(patient,today) {
    const data = {
      patient:patient,
      today:today
    }

    return this.http.post('http://localhost:4000/patient/appointments',data)
  }
  cancelAppointment(id) {
    const data = { id: id }
    return this.http.post('http://localhost:4000/patient/cancel', data)

  }
  getReports(un) {
    const data = { username: un }
    return this.http.post('http://localhost:4000/patient/reports', data)
  }

  join(patient) {
    return this.http.post('http://localhost:4000/patient/join',{patient})
  }
  sendMail(dt,qr, ml) {

    console.log(qr);
    const data = {
      data: dt,
      qrcode:qr,
      mail:ml
    }

    return this.http.post('http://localhost:4000/patient/mail', data)
  }
upload(pdf){
  return this.http.post('http://localhost:4000/patient/upload', {pdf})
}
read(user,message){
  const data={username:user,message:message}
  return this.http.post('http://localhost:4000/patient/read', data)

}

addMessage(app,un,title,text,from,code,time){
  const data = {
    appointment : app,
    username:un,
    title:title,
    text:text,
    from:from,
    code:code,
    time:time
  }
  
  return this.http.post('http://localhost:4000/patient/add', data)



}

 



}
