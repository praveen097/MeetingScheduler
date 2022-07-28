export class Meeting {
    constructor(
        public title ?: string,
        public agenda ?: string,
        public guestName ?: string,
        public guestId ?: string,
        public organizer ?: string,
        public organizerId ?: string,
        public timings ?: Date,
        public id ?:string
      ){}
}
