import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class MeetingSchedulerService {
  public loggedIn: boolean = false;
  public terrraformers: any = [];
  public organizerId: string = '';
  public organizerName: string = '';
  public guestDetails:any;
  public meetings:any;
  public meetingId:string = ''

  constructor(private _http: HttpClient) {}
  public setLogInStatus(response: boolean) {
    this.loggedIn = response;
  }
  public validateUser(data: any) {
    return this._http.post('http://localhost:6715/validateUser', data);
  }
  public registerTerraformers(data: Register) {
    return this._http.post('http://localhost:1337/terraformers', data);
  }
  public getTerraformersById(id: string) {
    return this._http.get('http://localhost:1337/terraformers/' + id);
  }

  public getAllTerraformers() {
    return this._http.get('http://localhost:1337/terraformers');
  }

  public updateTerraformers(data:any){    
    return this._http.put('http://localhost:1337/terraformers/'+ this.organizerId,data);
  }
  public setTerraformers() {
    this.getAllTerraformers().subscribe((result) => {
      this.terrraformers = result;
    });
  }

  public validCredentials(data: any) {
    for (let i = 0; i < this.terrraformers.length; i++) {
      const element = this.terrraformers[i];
      if (data.userName == element.email && data.password == element.password) {
        this.organizerId = element.id;
        this.organizerName = element.fullName;
        
        return true;
      }
    }
    return false;
  }
  public setMeetings(){
    this.getAllMeetings().subscribe((result) =>{      
      this.meetings = result;
    })
    return this.meetings;
    
  }
  
  public scheduleMeeting(data:any){
    return this._http.post("http://localhost:1337/meetings",data)
  }
  public getAllMeetings(){
    return this._http.get("http://localhost:1337/meetings");
  }
  public setMeetingId(id:string){
    this.meetingId = id;
  }
  public getMeetingById(id:string){
    return this._http.get("http://localhost:1337/meetings/" + id)
  }
  public updateMeeting(data:any){
    return this._http.put("http://localhost:1337/meetings/" + this.meetingId,data)
  }
  public deleteMeetingById(id:string){
    return this._http.delete("http://localhost:1337/meetings/" + id)
  }
}
