import { IAppointMentBooking } from "./types";
import { IAppointMentBookingService } from "../service/types";
import { Context } from "koa";
import {
  validateBooking,
  validateEmail,
  validateUpdate,
} from "../validation/appointment";

export class AppointMentBookingController implements IAppointMentBooking {
  constructor(
    private readonly appointmentBookingService: IAppointMentBookingService
  ) {}

  book = async (ctx: Context) => {
    try {
      const { error } = validateBooking(ctx.request.body);
      if (error) {
        ctx.status = 400;
        ctx.body = error.details[0].message;
        return;
      }
      const appointmentDetails: any = ctx.request.body;
      const appointment = await this.appointmentBookingService.bookAppointment(
        appointmentDetails
      );
      ctx.status = 201;
      ctx.body = appointment;
    } catch (err) {
      ctx.body = err.message || "INTERNAL_SERVER_ERROR";
      ctx.status = 500;
    }
  };

  getAppointMentDetailsByEmailAddress = async (ctx: Context) => {
    try {
      const { error } = validateEmail(ctx.query);
      if (error) {
        ctx.status = 400;
        ctx.body = error.details[0].message;
        return;
      }
      const email: any = ctx.query.email;
      const appointment =
        await this.appointmentBookingService.getAppointmentDetails(email);
      ctx.status = 200;
      ctx.body = appointment;
    } catch (err) {
      ctx.body = err.message || "INTERNAL_SERVER_ERROR";
      ctx.status = 500;
    }
  };

  getAppointmentsByDoctor = async (ctx: Context) => {
    try {
      const appointments =
        await this.appointmentBookingService.getAppointmentsByDoctor(
          ctx.params.doctorName
        );
      ctx.status = 200;
      ctx.body = appointments;
    } catch (err) {
      ctx.body = err.message || "INTERNAL_SERVER_ERROR";
      ctx.status = 500;
    }
  };

  cancelBooking = async (ctx: Context) => {
    try {
      const { email, timeSlot }: any = ctx.request.body;
      if (!email || !timeSlot) {
        ctx.status = 400;
        ctx.body = "email and timeSlot required";
        return;
      }
      const success = await this.appointmentBookingService.cancelAppointment(
        email,
        timeSlot
      );
      if (success) {
        ctx.body = "Appointment canceled successfully.";
      } else {
        ctx.status = 404;
        ctx.body = "Appointment not found.";
      }
    } catch (err) {
      (ctx.body = "INTERNAL_SRVER_ERROR"), (ctx.status = 500);
    }
  };
  modifyAppointMent = async (ctx: Context) => {
    try {
      const { error } = validateUpdate(ctx.request.body);
      if (error) {
        ctx.status = 400;
        ctx.body = error.details[0].message;
        return;
      }

      const { email, originalTimeSlot, newTimeSlot }: any = ctx.request.body;
      const updatedAppointment =
       await this.appointmentBookingService.modifyAppointment(
          email,
          originalTimeSlot,
          newTimeSlot
        );
      ctx.body = updatedAppointment;
      ctx.status=204
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.message;
    }
  };
}
