const express = require('express');
const app = express();
const router = express.Router();
var connection = require('./config/connection');

app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


app.listen(3000,()=>{
    console.log("Listen on port 3000 .... ");
});

app.get('/', function(req, res){
    res.render("index");
});

app.get('/home', function(req, res){
    res.render("home");
});


app.get('/customers', (req,res)=>{
    connection.query('SELECT * FROM customer',(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.get('/customer/:id', (req,res)=>{
    let sql = 'select * from customer where Id='+ [req.params.id];
    connection.query(sql,(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.post('/customer',(req,res)=>{
    // let params = req.body;
    let user = {
        "Name":req.body.Name,
        "Address": req.body.Address,
        "Country": req.body.Country,
        "Phone": req.body.Phone,
    };
    let sql ='INSERT INTO customer SET ?';

    //console.log(params);
    connection.query(sql, user,(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
});

app.delete('/customer/:id',(req,res)=>{
    let sql ='DELETE FROM customer WHERE id = '+[req.params.id];
    connection.query(sql,(err,results,fields)=>{
        if(err) throw err;
        res.end('Record has been deleted...');
    })
});

app.put('/customer/:id',(req,res)=>{
    let user = {
        "Name":req.body.Name,
        "Address": req.body.Address,
        "Country": req.body.Country,
        "Phone": req.body.Phone,
    };
    let sql ='UPDATE customer SET ? WHERE id = ?';

    connection.query(sql,[user,req.params.id],(err,results,fields)=>{
        if(err)throw err;
        res.json(results);
    })
});

















