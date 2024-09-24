Appointment Booking API
This Koa-based API allows users to manage appointment bookings for predefined doctors.

Endpoints:
```
POST /v1/book: Books a new appointment with a specified doctor.
GET /v1/appointment-details: Retrieves appointment details using the user's email.
GET /v1/appointments/:doctorName: Fetches all appointments for a specific doctor.
DELETE /v1/appointment: Cancels an appointment based on the user's email and time slot.
PATCH /v1/appointment: Modifies an existing appointment's time slot.
```
Installation:
Clone the repository and run npm install to install dependencies.

Usage:
Start the server with node <your-entry-file>.js and access the API on http://localhost:8080.

Technologies Used:
Koa, TypeScript, UUID for unique identifiers, and various Koa middleware for logging and body parsing.






