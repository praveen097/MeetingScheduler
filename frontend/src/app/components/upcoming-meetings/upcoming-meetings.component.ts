import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/models/meeting';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-upcoming-meetings',
  templateUrl: './upcoming-meetings.component.html',
  styleUrls: ['./upcoming-meetings.component.scss'],
})
export class UpcomingMeetingsComponent implements OnInit {
  public meetings: any;
  public upcomingMeetings: Meeting[] = [];
  public userId: string = '';
  public organizerName: string = '';
  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this._meetingSchedulerService.getAllMeetings().subscribe((result) => {
      this.meetings = result;
      for (let i = 0; i < this.meetings.length; i++) {
        const element = this.meetings[i];
        function formatMyDate(value: string | number | Date, locale = 'en-GB') {
          return new Date(value).toLocaleString();
        }
        this.meetings[i].timings = formatMyDate(element.timings);
        if (
          this.userId == element.organizerId ||
          this.userId == element.guestId
        ) {
          this.upcomingMeetings.push(this.meetings[i]);
        }
      }
    });
    this.userId = this._meetingSchedulerService.organizerId;
    this.organizerName = this._meetingSchedulerService.organizerName;
  }
  public editMeeting(id: any): void {
    this._meetingSchedulerService.setMeetingId(id);
    this._route.navigate(['editMeeting']);
  }
  public deleteMeeting(id: any): void {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this._meetingSchedulerService
        .deleteMeetingById(id)
        .subscribe((result) => {
          this._route.navigate(['dashboard']);
        });
    }
  }
}
