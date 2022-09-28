const mysql = require('mysql2'); 

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'testnode'
  });

  connection.connect(function(err){
    if (err) throw err
    console.log('You are now connected with mysql database...');
  });

  module.exports = connection;