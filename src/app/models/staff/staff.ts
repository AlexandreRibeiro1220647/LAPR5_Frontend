import {Slot} from './slot';
import {StaffStatus} from './staffstatus';

export interface Staff {
  licenseNumber: string;
  specialization: string;
  phone: string;
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
