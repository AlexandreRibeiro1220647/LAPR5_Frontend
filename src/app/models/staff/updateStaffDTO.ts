import {Slot} from './slot';
import {StaffStatus} from './staffstatus';export interface UpdateStaffDto {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  availabilitySlots: Slot[];
  status: StaffStatus;
}
