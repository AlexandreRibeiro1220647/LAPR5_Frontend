export class Slot {
  startTime: Date;
  endTime: Date;

  constructor(startTime: Date, endTime: Date) {
    if (startTime >= endTime) {
      throw new Error("Start time must be before end time.");
    }
    this.startTime = startTime;
    this.endTime = endTime;
  }

  changeSlot(startTime: Date, endTime: Date): void {
    if (startTime >= endTime) {
      throw new Error("Start time must be before end time.");
    }
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
