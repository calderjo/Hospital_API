const doctorRouter    = require('./doctor.js');
const patientRouter   = require('./patient.js');
const equipmentRouter = require('./equipment.js');


const route = require('koa-router')({
    prefix: '/api/v1'
});

route.get('/', (ctx) => {
    ctx.body = "Welcome to the Calderon General Hospital Api\n";
});

route.use(
    doctorRouter.routes(),
    patientRouter.routes(),
    equipmentRouter.routes()
);

module.exports = (server) => {
    server.use(route.routes());
};
