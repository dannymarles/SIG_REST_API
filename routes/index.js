var express = require('express');
var router = express.Router();

var pg = require('pg');
pg.defaults.ssl = process.env.DATABASE_URL != undefined;
var conString = process.env.DATABASE_URL || "postgres://postgres:root@localhost/postgres"; // Cadena de conexión a la base de datos

// Set up your database query to display GeoJSON
var coffee_query = 'SELECT * from puntos_cartagena';





/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'cartagena' });
});


router.get('/', function (req, res, next) {
  res.render('contacto', { title: 'contacto' });
});


router.get('/puntos', function (req, res, next) {
  res.render('puntos', {
    title: 'Puntos cartagena'
  }
  );
});


/* GET Postgres JSON data */
router.get('/data', function (req, res) {
  var client = new pg.Client(conString);
  client.connect();
  var query = client.query(coffee_query);
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    res.json(result.rows);
    res.end();
  });
});


router.get('/cartagena', function (req, res, next) {

  var client = new pg.Client(conString);
  client.connect();
  var query = client.query(coffee_query);
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    res.render('tabla_datos', {
      title: 'Puntos de Interes cartagena',
      datos: result.rows[0].row_to_json.datos
    });
  });

});


module.exports = router;
