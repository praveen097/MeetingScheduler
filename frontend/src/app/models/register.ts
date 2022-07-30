import { Time } from "@angular/common";

export class Register {
    constructor(
        public fullName ?: string,
        public email ?: string,
        public password ?: string,
        public dateOfBirth ?: Date,
        public mobile ?: number,
        public hoursOffStartTime ?: Time,
        public hoursOffEndTime ?: Time,
      ){}
}
