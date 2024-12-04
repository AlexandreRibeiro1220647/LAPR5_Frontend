
export interface ReturnToken {
  ag_op_room_better: string[][]; // [Slots][3](0 - Start Time / 1 - End Time / 2 - OpId)
  doctors_agenda_better: { doctor: string, schedule: { start_time: string, end_time: string, surgery_id: string }[] }[]; // [DoctorID][Slots][3](0 - Start Time / 1 - End Time / 2 - TaskID)
}
