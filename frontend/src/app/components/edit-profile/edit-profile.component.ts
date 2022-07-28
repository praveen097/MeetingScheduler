import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userCredentialModel = new Register();
  oneTimePassword: number = 0;
  captcha: string = '';
  array: any = [];
  userId:string = '';
  confirmPassword:any = '';

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.userId = this._meetingSchedulerService.organizerId;
    this._meetingSchedulerService.getTerraformersById(this.userId).subscribe((result) =>{
      this.userCredentialModel = result;
    })
    this.userCredentialModel.password = '';
    
  }

  public updateTerraformers(){
    if(this.confirmPassword != this.userCredentialModel.password){
      alert("Passwords are not same")
    }else{
      this._meetingSchedulerService.updateTerraformers(this.userCredentialModel).subscribe((result) =>{
      })
    }
    
  }

  public registerTerraformers(): void {
    this._meetingSchedulerService
      .registerTerraformers(this.userCredentialModel)
      .subscribe((result) => {
        this.array = JSON.parse(JSON.stringify(result));
        if (this.array['status'] == 'success') {
          this._route.navigate(['']);
        } else {
          console.log(result);
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
