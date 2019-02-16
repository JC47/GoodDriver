//Paquetes de node
const _ = require('underscore');
const express = require('express');
//Importaciones locales
const Pregunta = require('../models/pregunta');
const { verificaTokenEscuela, verificaTokenEscuela2 } = require('../middlewares/auth');

const app = express();

//Post para agregar una pregunta
app.post('/add', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let pregunta = new Pregunta({
        idTest: req.body.idTest,
        cuestion: req.body.cuestion,
        respuestas: req.body.respuestas
    });

    pregunta.save((err) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true
        });
    });

});

//Put para editar una pregunta
app.put('/update/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['cuestion']);
    let respuestas_x = req.body.respuestas;

    Pregunta.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true}, (err, pregunta) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Pregunta.updateOne({_id:id}, { $set: {respuestas:respuestas_x}}, (err2, pregunta2) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }
            res.json({
                ok: true,
                pregunta2
            });
        });
    });

});

//Obtiene todas las preguntas
app.get('/all', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    Pregunta.find({}).exec((err, preguntas) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            preguntas
        });
    });

});

//Obtiene una pregunta
app.get('/one/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;
    Pregunta.find({_id:id}).exec((err, pregunta) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            pregunta
        });
    });

});

//Borra una pregunta
app.delete('/delete/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;

    Pregunta.findOneAndRemove({_id:id}, (err) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true
        });
    });

});


module.exports = app;