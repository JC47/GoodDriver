const express = require('express');
const app = express();

const escuela = require('./escuela');
const consejo = require('./consejo');
const pregunta = require('./pregunta');
const test = require('./test');
const regla = require('./regla');
//const usuario = require('./usuario');

app.use('/escuela',escuela);
app.use('/consejo',consejo);
app.use('/pregunta', pregunta);
app.use('/test', test);
app.use('/regla', regla);
//app.use('/usuario', usuario);

module.exports = app;
