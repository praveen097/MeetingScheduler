import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/models/meeting';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss']
})
export class EditMeetingComponent implements OnInit {
  userCredentialModel = new Meeting();
  oneTimePassword: number = 0;
  captcha: string = '';
  array: any = [];
  guestDetails:any;
  meetingId:string = ''

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.userCredentialModel.organizerId = this._meetingSchedulerService.organizerId;
    this.userCredentialModel.organizer = this._meetingSchedulerService.organizerName;
    this.guestDetails = this._meetingSchedulerService.terrraformers; 
    this.meetingId = this._meetingSchedulerService.meetingId;
    this._meetingSchedulerService.getMeetingById(this.meetingId).subscribe((result) =>{
      console.log("getting meeting by id");
      console.log(result);
      this.userCredentialModel = result;
    })

  }

  
  public scheduleMeeting():void{
    this.setGuestId();
    this._meetingSchedulerService.scheduleMeeting(this.userCredentialModel).subscribe((result) =>{
      console.log(result);
    })
  }
  public setGuestId(){
    for (let i = 0; i < this.guestDetails.length; i++) {
      const element = this.guestDetails[i];
      if(element.fullName == this.userCredentialModel.guestName){
        this.userCredentialModel.guestId = element.id;
      }
    }
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
  public updateMeeting(){
    this._meetingSchedulerService.updateMeeting(this.userCredentialModel).subscribe((result) => {
      console.log(result);
    })
  }
  public getGuestId() {
    this.setGuestId();
  }


}
