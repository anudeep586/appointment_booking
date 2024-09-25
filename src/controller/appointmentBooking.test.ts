import { AppointMentBookingController } from './appointmentBooking';
import { Context } from 'koa';

describe('AppointMentBookingController', () => {
  let appointmentBookingController: AppointMentBookingController;
  let appointmentBookingService: {
    bookAppointment: jest.Mock;
    getAppointmentDetails: jest.Mock;
    getAppointmentsByDoctor: jest.Mock;
    cancelAppointment: jest.Mock;
    modifyAppointment: jest.Mock;
  };
  let ctx: Context;

  beforeEach(() => {
    appointmentBookingService = {
      bookAppointment: jest.fn(),
      getAppointmentDetails: jest.fn(),
      getAppointmentsByDoctor: jest.fn(),
      cancelAppointment: jest.fn(),
      modifyAppointment: jest.fn(),
    };

    appointmentBookingController = new AppointMentBookingController(appointmentBookingService);

    ctx = {
      request: { body: {}, },
      params: {},
      query: {} ,
      body: undefined,
      status: undefined,
    } as unknown as Context;
  });

  describe('book', () => {
    it('should return 201 and appointment details on successful booking', async () => {
      const appointmentDetails = { email: 'test@test.com', doctorName: 'Mahesh', timeSlot: '09:00 AM - 10:00 AM', firstName: 'Anudeep',lastName: 'Lakanavarapu' };
      (appointmentBookingService.bookAppointment as jest.Mock).mockResolvedValue(appointmentDetails);

      ctx.request.body = appointmentDetails;
      await appointmentBookingController.book(ctx);

      expect(ctx.status).toBe(201);
      expect(ctx.body).toEqual(appointmentDetails);
    });
  });

  describe('getAppointMentDetailsByEmailAddress', () => {
    it('should return 200 and appointment details on successful retrieval', async () => {
      const appointments = [{ email: 'test@test.com', timeSlot: '9:00 AM - 10:00 AM', doctorName: 'Mahesh' }];
      (appointmentBookingService.getAppointmentDetails as jest.Mock).mockResolvedValue(appointments);

      ctx.query.email = 'test@test.com';
      await appointmentBookingController.getAppointMentDetailsByEmailAddress(ctx);

      expect(ctx.status).toBe(200);
      expect(ctx.body).toEqual(appointments);
    });
  });

  describe('getAppointmentsByDoctor', () => {
    it('should return 200 and a list of appointments for the specified doctor', async () => {
      const appointments = [{ email: 'test@test.com', timeSlot: '9:00 AM - 10:00 AM', doctorName: 'Mahesh' }];
      (appointmentBookingService.getAppointmentsByDoctor as jest.Mock).mockResolvedValue(appointments);

      ctx.params.doctorName = 'Mahesh';
      await appointmentBookingController.getAppointmentsByDoctor(ctx);

      expect(ctx.status).toBe(200);
      expect(ctx.body).toEqual(appointments);
    });
  });

  describe('cancelBooking', () => {
    it('should return 404 if appointment not found', async () => {
      (appointmentBookingService.cancelAppointment as jest.Mock).mockResolvedValue(false);

      ctx.request.body = { email: 'test@test.com', timeSlot: '9:00 AM - 10:00 AM' };
      await appointmentBookingController.cancelBooking(ctx);

      expect(ctx.status).toBe(404);
      expect(ctx.body).toBe('Appointment not found.');
    });
  });

  describe('modifyAppointMent', () => {
    it('should return 200 and the updated appointment on successful modification', async () => {
      const updatedAppointment = { email: 'test@test.com', timeSlot: '10:00 AM - 11:00 AM', doctorName: 'Mahesh' };
      (appointmentBookingService.modifyAppointment as jest.Mock).mockResolvedValue(updatedAppointment);

      ctx.request.body = { email: 'test@test.com', originalTimeSlot: '9:00 AM - 10:00 AM', newTimeSlot: '10:00 AM - 11:00 AM' };
      await appointmentBookingController.modifyAppointMent(ctx);

      expect(ctx.status).toBe(204);
      expect(ctx.body).toEqual(updatedAppointment);
    });
  });
});
