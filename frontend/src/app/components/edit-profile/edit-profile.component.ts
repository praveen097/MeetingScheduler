import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  registerModel = new Register();
  userId: string = '';
  confirmPassword: any = '';

  constructor(
    private _meetingSchedulerService: MeetingSchedulerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.userId = this._meetingSchedulerService.organizerId;
    this._meetingSchedulerService
      .getTerraformersById(this.userId)
      .subscribe((result) => {
        this.registerModel = result;
      });
    this.registerModel.password = '';
  }

  public updateTerraformers(): void {
    if (this.confirmPassword != this.registerModel.password) {
      alert('Please confirm password to update');
    } else {
      this._meetingSchedulerService
        .updateTerraformers(this.registerModel)
        .subscribe((result) => {
          alert('Profile updated successfully');
          this._route.navigate(['dashboard']);
        });
    }
  }
}
