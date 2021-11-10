const db = require('../database/connection');

class EquipmentController {
    
    static async available_equipment(ctx){
        try{
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM available_equipment;'; 
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
            console.error(`EquipmentController.available_equipment: ${error}`);
         }
    }

    static async return_equipment(ctx){
        try{
            return new Promise((resolve, reject) => {

                const transfer = ctx.request.body;

                const query = 

                    `UPDATE hospital_medical_equipment 
                     SET nurse = NULL, patient = NULL 
                     WHERE
                     nurse = ? and equipment_name = ? and equipment_number = ?;
                    `;

                db.query({

                    sql: query,
                    values: [transfer.nurse, transfer.equipmentName, transfer.equipmentNumber]
                    
                }, (err, res)=>{
                    if(err){
                        reject(err);
                    }
                          
                    ctx.body = `The ${transfer.equipmentName} has been returned, Thank you!\n`;
                    ctx.status = 200;
                    resolve();
                });
            });
        }catch(error){
            console.error(`EquipmentController.return_equipment: ${error}`);
         }
    }

    static async checkout_equipment(ctx){
        try{
            return new Promise((resolve, reject) => {

                const checkoutInfo = ctx.request.body;

                const info = ctx.request.body;

                const query = 'CALL checkoutEquipment(?, ?, ?, ?)'; 

                db.query({ 
                    sql:query, 
                    values:[checkoutInfo.nurse_id, checkoutInfo.patient_id, checkoutInfo.equipment_name, checkoutInfo.equipment_number]
                },(err, res)=>{

                    if(err){
                        reject(err);
                    }

                    const new_checkout = {
                        nurse:   checkoutInfo.nurse_id,
                        patient: checkoutInfo.patient_id,
                        equipment_name:   checkoutInfo.equipment_name,
                        equipment_number: checkoutInfo.equipment_number
                    };

                    ctx.body = new_checkout;
                    ctx.status = 200;
                    resolve();

                });
            });
        }catch(error){
            console.error(`EquipmentController.checkout_equipment: ${error}`);
         }
    }

}


module.exports = EquipmentController;
