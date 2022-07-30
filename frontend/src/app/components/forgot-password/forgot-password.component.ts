import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user-credentials';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: any;
  mobile: any;
  userExist: boolean = false;
  password: any;
  confirmPassword: any;

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {}
  validateUser(): void {
    if (this._meetingSchedulerService.checkUser(this.email, this.mobile)) {
      this.userExist = true;
      this.email = '';
      this.mobile = '';
      Swal.fire({
        title:'User Exists!',
        confirmButtonColor:'#D8CE17',
        icon:'success'
      })
    } else {
      Swal.fire({
        title:'User doesnt exist with these credentials!',
        confirmButtonColor:'#D8CE17',
        icon:'error'
      })
      this._route.navigate(['signup']);
    }
  }
  updatePassword(): void {
    if (this.password != this.confirmPassword) {
      Swal.fire({
        title:'Password & confirm password should be same!',
        confirmButtonColor:'#D8CE17',
        icon:'error'
      })
    } else {
      if (this._meetingSchedulerService.updatePassword(this.password)) {
        Swal.fire({
          title:'Password updated successfully!',
          confirmButtonColor:'#D8CE17',
          icon:'success'
        })
        this._route.navigate(['']);
      } else {
        Swal.fire({
          title:'Failed to update password!',
          confirmButtonColor:'#D8CE17',
          icon:'error'
        })
      }
    }
  }
}
