
export interface ReturnToken {
  ag_op_room_better: string[][]; // [Slots][3](0 - Start Time / 1 - End Time / 2 - OpId)
  lag_doctors_better: string[][][]; // [DoctorID][Slots][3](0 - Start Time / 1 - End Time / 2 - TaskID)
}
