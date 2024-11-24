export interface CreatePatientDTO {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  contactInformation: string;
  email: string;
  medicalConditions: string[];
  emergencyContact: string;
  appointmentHistory: string[];
}
