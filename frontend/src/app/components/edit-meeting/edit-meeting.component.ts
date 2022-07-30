import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/models/meeting';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss'],
})
export class EditMeetingComponent implements OnInit {
  public meetingModel = new Meeting();
  public captcha: string = '';
  public array: any[] = [];
  public guestDetails: any;
  public meetingId: string = '';

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.meetingModel.organizerId = this._meetingSchedulerService.organizerId;
    this.meetingModel.organizer = this._meetingSchedulerService.organizerName;
    this.guestDetails = this._meetingSchedulerService.terrraformers;
    this.meetingId = this._meetingSchedulerService.meetingId;
    this._meetingSchedulerService
      .getMeetingById(this.meetingId)
      .subscribe((result) => {
        console.log('getting meeting by id');
        console.log(result);
        this.meetingModel = result;
      });
  }

  public scheduleMeeting(): void {
    this.setGuestId();
    this._meetingSchedulerService
      .scheduleMeeting(this.meetingModel)
      .subscribe((result) => {
        console.log(result);
      });
  }
  public setGuestId(): void {
    for (let i = 0; i < this.guestDetails.length; i++) {
      const element = this.guestDetails[i];
      if (element.fullName == this.meetingModel.guestName) {
        this.meetingModel.guestId = element.id;
      }
    }
  }

  public upComingMeetings(): void {
    this._route.navigate(['upcomingMeetings']);
  }

  public updateMeeting(): void {
    this._meetingSchedulerService
      .updateMeeting(this.meetingModel)
      .subscribe((result) => {
        if (result != null) {
          Swal.fire({
            title:'updated meeting successfully!',
            confirmButtonColor:'#D8CE17',
            icon:'success'
          })
          this._route.navigate(['upcomingMeetings']);
        }
      });
  }
  public getGuestId(): void {
    this.setGuestId();
  }
  public checkUsersAvailable(): void {
    this.array = [];
    for (let i = 0; i < this.guestDetails.length; i++) {
      const element = this.guestDetails[i];
      if (element.fullName == this.meetingModel.guestName) {
        this.meetingModel.guestId = element.id;
      }

      if (
        (moment(this.meetingModel.timings).isAfter(element.hoursOffStartTime) &&
          moment(this.meetingModel.timings).isBefore(
            element.hoursOffEndTime
          )) ||
        element.id == this.meetingModel.organizerId
      ) {
      } else {
        this.array.push(element);
      }
    }
  }
}
