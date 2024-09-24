import * as Koa from 'koa';
import * as Router from 'koa-router'
import logger=require('koa-logger');
import bodyparser=require('koa-bodyparser')
import { AppointMentBookingService } from "./service/client";
import { AppointMentBookingController } from "./controller/appointmentBooking";

const port=process.env.PORT || 8080

const app=new Koa();
const router=new Router();
app.use(logger());
app.use(bodyparser());

router.get('/',async (ctx)=>{
    ctx.body='Welcome to Koa';
});

const appointmentBookingService = new AppointMentBookingService();
const appointmentBookingController = new AppointMentBookingController(appointmentBookingService)


router.post("/v1/book",appointmentBookingController.book);
router.get("/v1/appointment-details",appointmentBookingController.getAppointMentDetailsByEmailAddress);
router.get("/v1/appointments/:doctorName", appointmentBookingController.getAppointmentsByDoctor);
router.delete("/v1/appointment", appointmentBookingController.cancelBooking);
router.patch("/v1/appointment", appointmentBookingController.modifyAppointMent);

app.use(router.routes());
app.listen(port);

console.log(` My koa server is up and listening on port ${port}`)
