import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class MeetingSchedulerService {
  public loggedIn: boolean = false;
  public terrraformers: any = [];
  public userId: string = '';

  constructor(private _http: HttpClient) {}
  public setLogInStatus(response: boolean) {
    this.loggedIn = response;
  }
  public validateUser(data: any) {
    return this._http.post('http://localhost:6715/validateUser', data);
  }
  public registerTerraformers(data: Register) {
    console.log(data);
    return this._http.post('http://localhost:1337/terraformers', data);
  }
  public getTerraformers(id: string) {
    console.log('one terraformer called');
    return this._http.get('http://localhost:1337/terraformers/' + id);
  }

  public getAllTerraformers() {
    console.log('all terraformer called');
    return this._http.get('http://localhost:1337/terraformers');
  }
  public setTerraformers() {
    this.getAllTerraformers().subscribe((result) => {
      this.terrraformers = result;
      console.log(this.terrraformers);
    });
  }

  public validCredentials(data: any) {
    console.log(data.userName);
    console.log(data.password);

    for (let i = 0; i < this.terrraformers.length; i++) {
      const element = this.terrraformers[i];
      if (data.userName == element.email && data.password == element.password) {
        console.log('User Found');
        this.userId = element.id;
        console.log(this.userId);
        
        return true;
      }
    }
    console.log('User not found');
    return false;
  }
}
