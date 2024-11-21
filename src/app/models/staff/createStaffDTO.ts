import {Slot} from './slot';
import {StaffStatus} from './staffstatus';export interface CreateStaffDTO {
  specialization: string;
  fullName: string;
  phone: string;
  email: string;
  availabilitySlots: Slot[];
  status: StaffStatus;
}
