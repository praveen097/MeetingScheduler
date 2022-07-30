import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { MeetingSchedulerService } from 'src/app/service/meeting-scheduler.service';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: 'Please confirm password to update!',
        confirmButtonColor: '#D8CE17',
        icon: 'warning',
      });
    } else {
      this._meetingSchedulerService
        .updateTerraformers(this.registerModel)
        .subscribe((result) => {
          Swal.fire({
            title: 'Profile updated successfully!',
            confirmButtonColor: '#D8CE17',
            icon: 'success',
          });
          this._route.navigate(['dashboard']);
        });
    }
  }
}
