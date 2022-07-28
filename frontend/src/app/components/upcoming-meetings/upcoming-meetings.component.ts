import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/models/meeting';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-upcoming-meetings',
  templateUrl: './upcoming-meetings.component.html',
  styleUrls: ['./upcoming-meetings.component.scss']
})
export class UpcomingMeetingsComponent implements OnInit {
  public meetings:any;
  public upcomingMeetings:Meeting[] = [];
  public userId:string = '';
  constructor(private _meetingSchedulerService:MeetingSchedulerService, private _route:Router) { }
  

  ngOnInit(): void {
    this._meetingSchedulerService.getAllMeetings().subscribe((result) => {
      this.meetings = result;
      for (let i = 0; i < this.meetings.length; i++) {
        const element = this.meetings[i];
        
        if(this.userId == element.organizerId || this.userId == element.guestId ){
          this.upcomingMeetings.push(this.meetings[i]);
        }
      }
      
    })
    this.userId = this._meetingSchedulerService.organizerId;
  }
  public editMeeting(id:any){
    this._meetingSchedulerService.setMeetingId(id);
    this._route.navigate(['editMeeting'])
  }

}
