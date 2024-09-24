import { Context } from "koa";
import { Appointment, IAppointMentBookingService } from "./types";
import { v4 as uuidv4 } from 'uuid';

export class AppointMentBookingService implements IAppointMentBookingService {
  private appointments: any[] = [];
  private readonly doctors: string[] = [
    "Mahesh",
    "Sunil",
    "Siddharath",
  ];

  bookAppointment = async (appointMentDetails: Appointment): Promise<any> => {
    if (!this.doctors.includes(appointMentDetails.doctorName)) {
      throw new Error("Invalid doctor name. Choose from the predefined list.");
    }
    const overlappingAppointment = this.appointments.find(
      (a) =>
        a.doctorName === appointMentDetails.doctorName &&
        this.isTimeSlotOverlap(a.timeSlot, appointMentDetails.timeSlot)
    );
    if (overlappingAppointment) {
      throw new Error("Time slot already booked for this doctor.");
    }
    const userId = uuidv4();
    this.appointments.push({ ...appointMentDetails, userId });
    return { ...appointMentDetails, userId};
  };

  getAppointmentDetails = async(emailAddress: string): Promise<any>=>{
    const userDetails =  this.appointments.filter((appointment) => appointment.email === emailAddress);
    if(userDetails){
      return userDetails
    }else{
      throw new Error("No user details found")
    }
  }

  getAppointmentsByDoctor = async(doctorName: string): Promise<any>=>{
    return this.appointments.filter((appointment) => appointment.doctorName === doctorName);
  }

  cancelAppointment = async (email: string, timeSlot: string): Promise<any>=> {
    const index = this.appointments.findIndex(
      (appointment) => appointment.email === email && appointment.timeSlot === timeSlot
    );
    if (index !== -1) {
      this.appointments.splice(index, 1);
      return true;
    }
    return false;
  }

  modifyAppointment=async(email: string, originalTimeSlot: string, newTimeSlot: string): Promise<any>=> {
    const userAppointments = await this.getAppointmentDetails(email);
    
    const appointment = userAppointments.find(
        (a:any) => a.timeSlot === originalTimeSlot
    );
    
    if (!appointment) {
        throw new Error("Original appointment not found.");
    }

    const overlappingAppointment = this.appointments.find(
        (a) =>
            a.doctorName === appointment.doctorName &&
            a.email !== email && 
            this.isTimeSlotOverlap(a.timeSlot, newTimeSlot)
    );
    
    if (overlappingAppointment) {
        throw new Error("The new time slot is already booked for this doctor.");
    }
    appointment.timeSlot = newTimeSlot;
    return appointment;
  }

  private isTimeSlotOverlap(slot1: string, slot2: string): boolean {
    const [start1, end1] = slot1.split(" - ").map(this.parseTime);
    const [start2, end2] = slot2.split(" - ").map(this.parseTime);

    return start1 < end2 && start2 < end1;
  }

  private parseTime(time: string): number {
    const [hourMin, period] = time.split(" ");
    let [hour, minute] = hourMin.split(":").map(Number);
    // Convert PM hours to 24-hour format
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }
    // Convert time to minutes for easy comparison
    return hour * 60 + minute;
  }
}