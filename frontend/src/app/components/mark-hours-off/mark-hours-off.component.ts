import { Time } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';
import Swal from 'sweetalert2';

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
          Swal.fire({
            title:'Marked successfully!',
            confirmButtonColor:'#D8CE17',
            icon:'success'
          })
          this._route.navigate(['/dashboard']);
        });
    } else {
      Swal.fire({
        title:'Need to mark both start time & end time!',
        confirmButtonColor:'#D8CE17',
        icon:'success'
      })
    }
  }
}
