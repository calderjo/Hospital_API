const equipment = require('../controllers/equipment.js');

const route = require('koa-router')({
    prefix: '/equipment'
});


route.get('/available', equipment.available_equipment);

route.put('/return', equipment.return_equipment);
route.put('/checkout_equipment', equipment.checkout_equipment);


module.exports = route;
