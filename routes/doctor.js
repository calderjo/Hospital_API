const doctor = require('../controllers/doctor.js');

const route = require('koa-router')({
    prefix: '/doctor'
});

// get requests
route.get('/patient', doctor.doctor_current_patient);
route.get('/medicalChart/:patient_id', doctor.get_medicalChart)

// put requests
route.put('/assignNewPatient', doctor.addNewPatient);


module.exports = route;

