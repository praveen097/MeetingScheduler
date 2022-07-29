import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user-credentials';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email:any;
  mobile:any;
  userExist:boolean = false;
  password:any;
  confirmPassword:any;

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    
  }
  validateUser() {
    if(this._meetingSchedulerService.checkUser(this.email,this.mobile)){
      this.userExist = true;
      this.email = "";
      this.mobile = "";
      alert("user exists")
    }else{
      alert("User doesn't exist with these credentials, kindly register");
      this._route.navigate(['signup'])
    }
  }
  updatePassword(){
    if(this.password != this.confirmPassword){
      alert("Passwords needs to same")
    }else{
      if(this._meetingSchedulerService.updatePassword(this.password)){        
        alert("password update successfully")
        this._route.navigate([''])
      }else{
        alert("failed to update password")
      }
    }
  }
  

}
