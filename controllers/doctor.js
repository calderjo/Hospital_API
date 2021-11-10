const db = require('../database/connection');

class DoctorController {
    
    static async doctor_current_patient(ctx){
        try{
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM doctor_patient;'; 
                db.query(query, (err, res)=>{
                    if(err){
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve();
                });
            });

        }catch(error){
            console.error(`DoctorController.doctor_current_patient: ${error}`);
        }
    }

    static async addNewPatient(ctx){
        try{
            return new Promise((resolve, reject) => {

                const info = ctx.request.body;
                const query = 'CALL assignNewPatientToDoctor(?, ?)'; 

                db.query({ 
                    sql:query, 
                    values:[info.doctor_id, info.patient_id]
                },(err, res)=>{

                    if(err){
                        reject(err);
                    }

                    const doc_patient = {
                        doctor:  info.doctor_id,
                        patient: info.patient_id
                    };

                    ctx.body = doc_patient;
                    ctx.status = 200;
                    resolve();
                });
            });

        }catch(error){
            console.error(`DoctorController.addNewPatient: ${error}`);
        }
    }

    static async get_medicalChart(ctx){
        try{
            const patient = ctx.params.patient_id;

            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM hospital_medical_charts WHERE patient = ?;`;
                db.query(
                    { 
                        sql: query, 
                        values: [patient]
                    }
                    
                    ,(err, res)=>{
                    if(err){
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve();
                });
            });
        }catch(error){
            console.error(`DoctorController.get_medicalChart: ${error}`);
        }
    }
    
}


module.exports = DoctorController;
