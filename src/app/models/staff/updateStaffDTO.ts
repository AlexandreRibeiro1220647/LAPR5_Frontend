import {Slot} from './slot';
import {StaffStatus} from './staffstatus';export interface UpdateStaffDto {
  phone: string;
  specialization: string;
  availabilitySlots: Slot[];
  status: StaffStatus;
  user: {
    id: string;
    name: string;
    email: {
      value: string;
    };
    role: string;
  };
}
