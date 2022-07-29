import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {}
  public logOut(): void {
    this._route.navigate(['']);
    this._meetingSchedulerService.setLogInStatus(false);
    this._route.navigate(['']);
    window.location.reload();
  }
}
