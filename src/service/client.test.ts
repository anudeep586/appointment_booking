import { AppointMentBookingService } from './client';

describe('AppointMentBookingService', () => {
  let service: AppointMentBookingService;

  beforeEach(() => {
    service = new AppointMentBookingService();
  });

  test('should book an appointment successfully', async () => {
    const appointmentDetails: any = {
      email: 'test@example.com',
      doctorName: 'Mahesh',
      timeSlot: '10:00 AM - 10:30 AM',
    };
    const bookedAppointment = await service.bookAppointment(appointmentDetails);
    expect(bookedAppointment).toHaveProperty('userId');
    expect(bookedAppointment).toEqual(expect.objectContaining(appointmentDetails));
  });

  test('should throw an error for invalid doctor name', async () => {
    const appointmentDetails: any = {
      email: 'test@example.com',
      doctorName: 'Unknown',
      timeSlot: '10:00 AM - 10:30 AM',
    };
    await expect(service.bookAppointment(appointmentDetails)).rejects.toThrow("Invalid doctor name. Choose from the predefined list.");
  });

  test('should throw an error for overlapping appointments', async () => {
    const appointmentDetails1: any = {
      email: 'test@example.com',
      doctorName: 'Mahesh',
      timeSlot: '10:00 AM - 10:30 AM',
    };
    await service.bookAppointment(appointmentDetails1);

    const appointmentDetails2: any = {
      email: 'another@example.com',
      doctorName: 'Mahesh',
      timeSlot: '10:15 AM - 10:45 AM',
    };
    await expect(service.bookAppointment(appointmentDetails2)).rejects.toThrow("Time slot already booked for this doctor.");
  });

  test('should return appointment details by email', async () => {
    const appointmentDetails: any = {
      email: 'test@example.com',
      doctorName: 'Mahesh',
      timeSlot: '10:00 AM - 10:30 AM',
    };
    await service.bookAppointment(appointmentDetails);

    const appointments = await service.getAppointmentDetails('test@example.com');
    expect(appointments.length).toBe(1);
    expect(appointments[0]).toEqual(expect.objectContaining(appointmentDetails));
  });


  test('should modify an appointment successfully', async () => {
    const appointmentDetails: any = {
      email: 'test@example.com',
      doctorName: 'Mahesh',
      timeSlot: '10:00 AM - 10:30 AM',
    };
    await service.bookAppointment(appointmentDetails);

    const modifiedAppointment = await service.modifyAppointment('test@example.com', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM');
    expect(modifiedAppointment.timeSlot).toBe('10:30 AM - 11:00 AM');
  });

  test('should throw an error if original appointment not found for modification', async () => {
    await expect(service.modifyAppointment('test@example.com', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM')).rejects.toThrow("Original appointment not found.");
  });
});
