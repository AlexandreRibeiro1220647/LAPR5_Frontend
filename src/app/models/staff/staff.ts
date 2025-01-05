import {Slot} from './slot';
import {StaffStatus} from './staffstatus';

export interface Staff {
  licenseNumber: string;
  specializationId: string;
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

export class SpecializationDto {
  constructor(
    public specializationId: string,
    public specializationDesignation: string,
    public specializationCode: string,
    public specializationDescription: string,
  ) {}
}
export class CreateSpecializationDto {
  constructor(
    public specializationDesignation: string,
    public specializationCode: string,
    public specializationDescription: string,
  ) {}
}
export class SearchSpecializationDto {
  constructor(
    public specializationDesignation: string,
    public specializationCode: string,
    public specializationDescription: string,
  ) {}
}


export class Specialization {
  constructor(
    public specializationId: string,
    public specializationDesignation: string,
    public specializationCode: string,
    public specializationDescription: string) {}
}
