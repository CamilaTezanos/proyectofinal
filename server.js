const mysql = require('mysql');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.set ('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use (express.json());

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));

//mysql
const connection = mysql.createConnection({
    host: 'freedb.tech',
    user: 'freedbtech_camilatezanos',
    password: 'yiyo123',
    database: 'freedbtech_TrabajoFinalCamilaDB'
});

app.get('/home', (req, res) => res.render('pages/home'))
app.get('/aboutus', (req, res) => res.render('pages/aboutus'))
app.get('/shop', (req, res) => res.render('pages/shop'))
app.get('/contact', (req, res) => res.render('pages/contact'))
app.get('/customers', (req, res) => {

    const sql = 'SELECT * FROM contactus';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('pages/resultado', {
            'results': results
        });

    });

});

app.post('/add', (req, res) => {

    const sql = `SELECT * FROM contactus WHERE Correo = '${req.body.email}'`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {

            res.send('correo enviado');

        } else {

            const sql = 'INSERT INTO contactus SET ?';

            const customerObj = {
                Nombre: req.body.firstname,
                Apellido: req.body.lastname,
                Correo: req.body.email
            }


            connection.query(sql, customerObj, error => {
                if (error) throw error;
                res.send("correo enviado");

            });
        }

    });




})

app.listen(port, () => console.log('server running'))