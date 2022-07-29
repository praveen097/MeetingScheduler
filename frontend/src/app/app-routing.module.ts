import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditMeetingComponent } from './components/edit-meeting/edit-meeting.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { MarkHoursOffComponent } from './components/mark-hours-off/mark-hours-off.component';
import { RegisterComponent } from './components/register/register.component';
import { ScheduleMeetingComponent } from './components/schedule-meeting/schedule-meeting.component';
import { UpcomingMeetingsComponent } from './components/upcoming-meetings/upcoming-meetings.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'scheduleMeeting', component: ScheduleMeetingComponent },
  { path: 'editMeeting', component: EditMeetingComponent },
  { path: 'upcomingMeetings', component: UpcomingMeetingsComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'markHoursOff', component: MarkHoursOffComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
