export interface UpdatePatientDTO {
    fullName?: string;
    contactInformation?: string;
    email?: string;
    medicalConditions?: string[];
    emergencyContact?: string;
}