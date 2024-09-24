import * as Joi from "joi";

export const validateBooking = (data: any) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    timeSlot: Joi.string().pattern(/^\d{2}:\d{2} [AP]M - \d{2}:\d{2} [AP]M$/).required(),
    doctorName: Joi.string().required(),
  });
  return schema.validate(data);
};

export const validateEmail = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

export const validateUpdate = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    originalTimeSlot: Joi.string().required(),
    newTimeSlot: Joi.string().required(),
  });
  return schema.validate(data);
};
