export interface Patient {
    dateOfBirth: string;
    gender: string;
    medicalRecordNumber: string;
    contactInformation: string;
    medicalConditions: string[];
    emergencyContact: string;
    appointmentHistory: string[];
    user: {
      id: string;
      name: string;
      email: {
        value: string;
      };
      role: string;
    };
  }