import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Meeting } from 'src/app/models/meeting';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';
import Swal from 'sweetalert2';

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
  public checkUsersAvailable(): void {
    this.array = [];
    for (let i = 0; i < this.guestDetails.length; i++) {
      const element = this.guestDetails[i];
      if (element.fullName == this.userCredentialModel.guestName) {
        this.userCredentialModel.guestId = element.id;
      }

      if (
        moment(this.userCredentialModel.timings).isAfter(
          element.hoursOffStartTime
        ) &&
        moment(this.userCredentialModel.timings).isBefore(
          element.hoursOffEndTime
        )
      ) {
      } else {
        if (element.id == this.userCredentialModel.organizerId) {
        } else {
          this.array.push(element);
        }
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
        if (result != null) {
          Swal.fire({
            title:'Meeting scheduled successfully!',
            confirmButtonColor:'#D8CE17',
            icon:'success'
          })
          this._route.navigate(['dashboard']);
        }
      });
  }

  public toDashboard(): void {
    this._route.navigate(['dashboard']);
  }
}
