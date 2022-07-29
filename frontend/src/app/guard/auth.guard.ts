import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MeetingSchedulerService } from '../service/meeting-scheduler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _meetingSchedulerService:MeetingSchedulerService, private _route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._meetingSchedulerService.loggedIn){
        return true;
      }else{
        this._route.navigate([''])
        return false;
      }
  }
  
}
