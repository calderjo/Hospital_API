const mysql = require('mysql');

const config = {
    debug: false,
    host:  '127.0.0.1',
    port:  3306,
    database: 'calderon_cs355fl20',
    user: 'calderon_cs355fl20',
    password: 'ca7202644'
};

const dbConnection = mysql.createConnection(config);


module.exports = dbConnection;
