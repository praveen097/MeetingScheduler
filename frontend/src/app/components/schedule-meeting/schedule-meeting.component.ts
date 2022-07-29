import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Meeting } from 'src/app/models/meeting';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.scss'],
})
export class ScheduleMeetingComponent implements OnInit {
  userCredentialModel = new Meeting();
  oneTimePassword: number = 0;
  captcha: string = '';
  array: any[] = [];
  guestDetails: any;

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.userCredentialModel.organizerId =
      this._meetingSchedulerService.organizerId;
    this.userCredentialModel.organizer =
      this._meetingSchedulerService.organizerName;
    this.guestDetails = this._meetingSchedulerService.terrraformers;
  }
  public checkUsersAvailable() {
    this.array = [];
    for (let i = 0; i < this.guestDetails.length; i++) {
      const element = this.guestDetails[i];
      if (element.fullName == this.userCredentialModel.guestName) {
        this.userCredentialModel.guestId = element.id;
      }

      if (
        (moment(this.userCredentialModel.timings).isAfter(
          element.hoursOffStartTime
        ) &&
          moment(this.userCredentialModel.timings).isBefore(
            element.hoursOffEndTime
          )) ||
        element.id == this.userCredentialModel.organizerId
      ) {

      } else {
        this.array.push(element);
      }
    }
  }

  public scheduleMeeting(): void {
    for (let i = 0; i < this.guestDetails.length; i++) {
      const element = this.guestDetails[i];
      if (element.fullName == this.userCredentialModel.guestName) {
        this.userCredentialModel.guestId = element.id;
      }
    }
    this._meetingSchedulerService
      .scheduleMeeting(this.userCredentialModel)
      .subscribe((result) => {
        if(result != null){
          this._route.navigate(['dashboard'])
        }
      });
  }

  public toLogIn(): void {
    this._route.navigate(['dashboard']);
  }
}
