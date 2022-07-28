import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/models/meeting';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.scss']
})
export class ScheduleMeetingComponent implements OnInit {
  userCredentialModel = new Meeting();
  oneTimePassword: number = 0;
  captcha: string = '';
  array: any = [];
  guestDetails:any;

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.userCredentialModel.organizerId = this._meetingSchedulerService.organizerId;
    this.userCredentialModel.organizer = this._meetingSchedulerService.organizerName;
    this.guestDetails = this._meetingSchedulerService.terrraformers;    
  }
  public registerTerraformers(): void {
    // this._meetingSchedulerService
    //   .registerTerraformers(this.userCredentialModel)
    //   .subscribe((result) => {
    //     console.log(result);
    //     this.array = JSON.parse(JSON.stringify(result));
    //     if (this.array['status'] == 'success') {
    //       this._route.navigate(['']);
    //     } else {
    //       console.log(result);
    //     }
    //   });
  }
  
  public scheduleMeeting():void{
    for (let i = 0; i < this.guestDetails.length; i++) {
      const element = this.guestDetails[i];
      if(element.fullName == this.userCredentialModel.guestName){
        this.userCredentialModel.guestId = element.id;
      }
    }
    this._meetingSchedulerService.scheduleMeeting(this.userCredentialModel).subscribe((result) =>{
    })
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
