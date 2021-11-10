const patient = require('../controllers/patient.js');

const route = require('koa-router')({
    prefix: '/patient'
});

route.get('/overview', patient.overview);

route.delete('/hospitalDischarge/:id', patient.discharge);

route.post('/admitPatient', patient.admitPatient);


module.exports = route;
