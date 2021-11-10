const db = require('../database/connection');

class PatientController {
    
    static async overview(ctx){
        try{
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM patient_overview;'; 
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
            console.error(`PatientController.patient_overview: ${error}`);
         }
    }

    static async discharge(ctx){
        try{
            return new Promise((resolve, reject) => {
                const patientID =  ctx.params.id;
                const query = `DELETE FROM hospital_patients WHERE patient_id = ?;`; 
                db.query({

                    sql: query,
                    values: [patientID]

                  },(err, res)=>{
                    if(err){
                        reject(err);
                    }

                    ctx.body = `Patient ${patientID} has been deleted.\n`;
                    ctx.status = 200;
                    resolve();
                });
            });
        }catch(error){
            console.error(`PatientController.discharge: ${error}`);
         }
    }

    static async admitPatient(ctx){
        try{
            return new Promise((resolve, reject) => {
                const newPatient = ctx.request.body;

                const query = `call admitPatient(?,?,?,?);`; 
                db.query({ 
                    sql: query,
                    values: [newPatient.ID, newPatient.first_name, newPatient.last_name, newPatient.Date]
                }, (err, res)=>{

                    if(err){
                        reject(err);
                    }

                    const pat ={
                         patientID: newPatient.ID, 
                         firstName: newPatient.first_name,
                         last_name: newPatient.last_name,
                         admissionDate: newPatient.Date
                    };

                    ctx.body = pat;
                    ctx.status = 200;
                    resolve();
                });
            });
        }catch(error){
            console.error(`PatientController.admitPatient: ${error}`);
         }
    }
   
}


module.exports = PatientController;
