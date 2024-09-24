export interface IAppointMentBookingService {
  bookAppointment(appointment: Appointment): Promise<any>;
  getAppointmentDetails(emailAddress: string): Promise<any>;
  getAppointmentsByDoctor(doctorName: string): Promise<any>;
  cancelAppointment(emailAddress: string, timeSlot: string): Promise<any>;
  modifyAppointment(
    emailAddress: string,
    originalTimeSlot: string,
    newTimeSlot: string
  ): Promise<any>;
}
export interface Appointment {
  firstName: string;
  lastName: string;
  email: string;
  timeSlot: string;
  doctorName: string;
  id?: string;
}
