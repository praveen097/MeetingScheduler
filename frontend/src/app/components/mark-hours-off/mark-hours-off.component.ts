import { Time } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-mark-hours-off',
  templateUrl: './mark-hours-off.component.html',
  styleUrls: ['./mark-hours-off.component.scss'],
})
export class MarkHoursOffComponent implements OnInit {
  userCredentialModel = new Register();
  userId: string = '';

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.userId = this._meetingSchedulerService.organizerId;
    this._meetingSchedulerService
      .getTerraformersById(this.userId)
      .subscribe((result) => {
        this.userCredentialModel = result;
      });
  }
  public getTimings(): void {
    if (
      this.userCredentialModel.hoursOffStartTime != null &&
      this.userCredentialModel.hoursOffEndTime != null
    ) {
      this._meetingSchedulerService
        .updateTerraformers(this.userCredentialModel)
        .subscribe((result) => {
          alert('Marked successfully');
          this._route.navigate(['/dashboard']);
        });
    } else {
      alert('Need to mark both start time and end time');
    }
  }
}
