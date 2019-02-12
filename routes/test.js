//Paquetes de node
const _ = require('underscore');
const express = require('express');
//Importaciones locales
const Test = require('../models/test');
const { verificaTokenEscuela ,verificaTokenEscuela2 } = require('../middlewares/auth');

const app = express();

//Post para agregar un test
app.post('/add', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let test = new Test({
        idEscuela: req.body.idEscuela,
        nivel: req.body.nivel,
        nombre: req.body.nombre,
        preguntas: req.body.preguntas
    });

    test.save((err) => {
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

//Put para editar un test
app.put('/update/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nivel','nombre']);
    let preguntas_x = req.body.preguntas;

    Test.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true}, (err, test) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Test.updateOne({_id:id}, { $set: {respuestas:preguntas_x}}, (err2, test2) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }
            res.json({
                ok: true,
                test2
            });
        });
    });

});

//Obtiene todos los tests
app.get('/all', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    Test.find({}).exec((err, tests) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            tests
        });
    });

});

//Obtiene un test
app.get('/one/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;
    Test.find({_id:id}).exec((err, test) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            test
        });
    });

});

//Borra un test
app.delete('/delete/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;

    Test.findOneAndRemove({_id:id}, (err) => {
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