import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { UserCredentials } from 'src/app/models/user-credentials';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userCredentialModel = new Register();
  oneTimePassword: number = 0;
  captcha: string = '';
  array: any = [];

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    
  }
  public registerTerraformers(): void {
    this._meetingSchedulerService
      .registerTerraformers(this.userCredentialModel)
      .subscribe((result) => {
        this.array = JSON.parse(JSON.stringify(result));
        if (this.array['status'] == 'success') {
          this._route.navigate(['']);
        } else {
        }
      });
  }
  public toLogIn(): void {
    this._route.navigate(['']);
  }
  public generateCaptcha(): void {
    this.captcha = '';
    this.oneTimePassword = Math.round(Math.random() * 1000000);
    if (Math.log10(this.oneTimePassword) + 1 < 6) {
      this.generateCaptcha();
    }
  }
}
