export type StaffStatus = 'INACTIVE' | 'ACTIVE';
export interface SearchStaffDTO {
  specialization?: string;
  phone?: string;
  status?: StaffStatus;
  user: {
    id: string;
    name: string;
    email: {
      value: string;
    };
    role: string;
  };
}
