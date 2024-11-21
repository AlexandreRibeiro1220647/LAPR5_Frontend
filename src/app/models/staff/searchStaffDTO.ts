export type StaffStatus = 'INACTIVE' | 'ACTIVE';
export interface SearchStaffDTO {
  fullName?: string;
  specialization?: string;
  email?: string;
  phone?: string;
  status?: StaffStatus;
}
