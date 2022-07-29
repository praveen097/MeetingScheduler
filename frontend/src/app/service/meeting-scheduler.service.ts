import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class MeetingSchedulerService {
  public loggedIn: boolean = false;
  public terrraformers: any = [];
  public organizerId: string = '';
  public organizerName: string = '';
  public guestDetails: any;
  public meetings: any;
  public meetingId: string = '';
  public singleTerraformer: any;

  constructor(private _http: HttpClient) {}
  public setLogInStatus(response: boolean) {
    this.loggedIn = response;
  }
  public validateUser(data: any): Observable<Object> {
    return this._http.post('http://localhost:6715/validateUser', data);
  }
  public registerTerraformers(data: Register): Observable<Object> {
    return this._http.post('http://localhost:1337/terraformers', data);
  }
  public getTerraformersById(id: string): Observable<Object> {
    return this._http.get('http://localhost:1337/terraformers/' + id);
  }

  public getAllTerraformers(): Observable<Object> {
    return this._http.get('http://localhost:1337/terraformers');
  }

  public updateTerraformers(data: any): Observable<Object> {
    return this._http.put(
      'http://localhost:1337/terraformers/' + this.organizerId,
      data
    );
  }
  public setTerraformers(): void {
    this.getAllTerraformers().subscribe((result) => {
      this.terrraformers = result;
    });
  }

  public validCredentials(data: any): boolean {
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
  public isUserExists(data: any): boolean {
    for (let i = 0; i < this.terrraformers.length; i++) {
      const element = this.terrraformers[i];
      if (data == element.email) {
        return true;
      }
    }
    return false;
  }
  public setMeetings(): any {
    this.getAllMeetings().subscribe((result) => {
      this.meetings = result;
    });
    return this.meetings;
  }

  public scheduleMeeting(data: any): Observable<Object> {
    return this._http.post('http://localhost:1337/meetings', data);
  }
  public getAllMeetings(): Observable<Object> {
    return this._http.get('http://localhost:1337/meetings');
  }
  public setMeetingId(id: string): void {
    this.meetingId = id;
  }
  public getMeetingById(id: string): Observable<Object> {
    return this._http.get('http://localhost:1337/meetings/' + id);
  }
  public updateMeeting(data: any): Observable<Object> {
    return this._http.put(
      'http://localhost:1337/meetings/' + this.meetingId,
      data
    );
  }
  public deleteMeetingById(id: string): Observable<Object> {
    return this._http.delete('http://localhost:1337/meetings/' + id);
  }
  public checkUser(email: any, mobile: any): boolean {
    for (let i = 0; i < this.terrraformers.length; i++) {
      const element = this.terrraformers[i];
      if (email == element.email && mobile == element.mobile) {
        this.organizerId = element.id;
        this.getTerraformersById(this.organizerId).subscribe((result) => {
          this.singleTerraformer = result;
        });
        return true;
      }
    }
    return false;
  }
  public updatePassword(password: any): boolean {
    this.singleTerraformer.password = password;
    this.updateTerraformers(this.singleTerraformer).subscribe((result) => {
      if (result != null) {
        return true;
      } else {
        return false;
      }
    });
    return true;
  }
}
