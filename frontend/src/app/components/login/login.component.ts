import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user-credentials';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userCredentialModel = new UserCredentials();
  public oneTimePassword: number = 0;
  public captcha: string = '';
  public customerId: any;

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
    this._meetingSchedulerService.setTerraformers();
  }
  public validateUser(): void {
    if (this.oneTimePassword == parseInt(this.captcha)) {
      if (
        this._meetingSchedulerService.validCredentials(this.userCredentialModel)
      ) {
        this._meetingSchedulerService.setLogInStatus(true);
        Swal.fire({
          title:'Login successful',
          confirmButtonColor:'#D8CE17',
          icon:'success'
        })
        this._route.navigate(['dashboard']);
      } else {
        Swal.fire({
          title:'username/password are wrong',
          confirmButtonColor:'#D8CE17',
          icon:'error'
        })
      }
    } else {
      Swal.fire({
        title:'Not a valid captcha',
        confirmButtonColor:'#D8CE17',
        icon:'error'
      })
      this.captcha = '';
    }
  }
  public toRegister(): void {
    this._route.navigate(['signup']);
  }
  public generateCaptcha(): void {
    this.captcha = '';
    this.oneTimePassword = Math.round(Math.random() * 1000000);
    if (Math.log10(this.oneTimePassword) + 1 < 6) {
      this.generateCaptcha();
    }
  }
}
