import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-mark-hours-off',
  templateUrl: './mark-hours-off.component.html',
  styleUrls: ['./mark-hours-off.component.scss']
})
export class MarkHoursOffComponent implements OnInit {
  userCredentialModel = new Register();
  userId:string = '';

  constructor(private _meetingSchedulerService:MeetingSchedulerService, private _route:Router) { }

  ngOnInit(): void {
    this.userId = this._meetingSchedulerService.organizerId;
    this._meetingSchedulerService.getTerraformersById(this.userId).subscribe((result) =>{
      this.userCredentialModel = result;
    })
  }
  public getTimings(){
    console.log(this.userCredentialModel);
    console.log(this.userCredentialModel.hoursOffStartTime);
    console.log(this.userCredentialModel.hoursOffEndTime);
    this._meetingSchedulerService.updateTerraformers(this.userCredentialModel).subscribe((result) =>{
      console.log(result);
    })
  }

}
