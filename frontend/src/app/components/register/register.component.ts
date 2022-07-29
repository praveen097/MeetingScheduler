import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerModel = new Register();
  oneTimePassword: number = 0;
  captcha: string = '';
  array: any = [];
  confirmPassword: any;

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {}
  public registerTerraformers(): void {
    if (
      this.registerModel.fullName != null &&
      this.registerModel.email != null &&
      this.registerModel.password != null &&
      this.registerModel.mobile != null
    ) {
      if (
        this._meetingSchedulerService.isUserExists(this.registerModel.email)
      ) {
        alert('User already exists with this email, please sign in');
        this._route.navigate(['']);
      } else {
        if (this.confirmPassword != this.registerModel.password) {
          alert('Passwords are not same');
        } else {
          this._meetingSchedulerService
            .registerTerraformers(this.registerModel)
            .subscribe((result) => {
              this.array = JSON.parse(JSON.stringify(result));
              if (this.array['status'] == 'success') {
                this._route.navigate(['']);
              } else {
              }
            });
        }
      }
    } else {
      alert('All fields are mandatory!');
    }
  }
}
