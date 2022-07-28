import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user-credentials';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userCredentialModel = new UserCredentials();
  oneTimePassword: number = 0;
  captcha: string = '';
  array: any = [];
  count: number = 0;
  public customerId: any;

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
    // this._meetingSchedulerService.getAllTerraformers().subscribe((result) => {
    //   console.log(result);
    // });
    this._meetingSchedulerService.setTerraformers();
  }
  public validateUser(): void {
    // if (this.oneTimePassword == parseInt(this.captcha)) {
    //   this._meetingSchedulerService
    //     .validateUser(this.userCredentialModel)
    //     .subscribe((result) => {
    //       console.log(result);
    //       this.array = JSON.parse(JSON.stringify(result));
    //       if (this.array['status'] == 'success') {
    //         localStorage.removeItem('customerId');
    //         var id = this.array['customerid'];
    //         localStorage.setItem('customerId', id);
    //         this.customerId = localStorage.getItem('customerId');
    //         this._meetingSchedulerService.setLogInStatus(true);
    //         this._route.navigate(['billPaymentRegistration']);
    //       } else {
    //         console.log(result);
    //       }
    //     });
    // } else {
    //   confirm('not valid otp');
    //   this.captcha = '';
    // }
    if(this._meetingSchedulerService.validCredentials(this.userCredentialModel)){
      this._meetingSchedulerService.setLogInStatus(true);
      this._route.navigate(['dashboard'])
    }else{
      alert("User name or password is wrong");
    }
  }
  public toRegister(): void {
    this._route.navigate(['/signup']);
  }
  public generateCaptcha(): void {
    this.captcha = '';
    this.oneTimePassword = Math.round(Math.random() * 1000000);
    if (Math.log10(this.oneTimePassword) + 1 < 6) {
      this.generateCaptcha();
    }
  }
}
