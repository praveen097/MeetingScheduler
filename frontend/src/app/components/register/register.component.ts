import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title:'User exists with this email!',
          confirmButtonColor:'#D8CE17',
          icon:'warning'
        })
        this._route.navigate(['']);
      } else {
        if (this.confirmPassword != this.registerModel.password) {
          Swal.fire({
            title:'Password & confirm password should be same!',
            confirmButtonColor:'#D8CE17',
            icon:'error'
          })
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
      Swal.fire({
        title:'All fields are mandatory!',
        confirmButtonColor:'#D8CE17',
        icon:'warning'
      })
    }
  }
}
