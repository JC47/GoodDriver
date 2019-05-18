//Paquetes de node
const _ = require('underscore');
const express = require('express');
//Importaciones locales
const Test = require('../models/test');
const Pregunta = require('../models/pregunta');
const { verificaTokenEscuela, verificaTokenEscuela2, verificaTokenRoot } = require('../middlewares/auth');

const app = express();

//Post para agregar un test
app.post('/add', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let test = new Test({
        idEscuela: req.body.idEscuela,
        nombre: req.body.nombre,
        preguntas: []
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

app.put('/addpregunta/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;

    let pregunta = new Pregunta({
        idTest: id,
        cuestion: req.body.cuestion,
        respuestas: req.body.respuestas
    });

    pregunta.save((err, result) => {

        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Test.findOneAndUpdate({ _id: id }, { $push: { preguntas: result._id } }, (err2) => {

            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err:err2
                });
            }

            res.json({ ok: true });

        });
    });

});

app.put('/removepregunta/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req, res) => {

    let id = req.params.id;
    let idPregunta = req.body.id;

    Test.findOne({ _id: id }).exec((err, test) => {

        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        test.preguntas.remove(idPregunta);

        test.save((err2) => {

            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err: err2
                });
            }

            Pregunta.findOneAndRemove({ _id: idPregunta }, (err) => {
                if (err != null) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true
                });
            });
        });
    });

});

//Obtiene todos los tests
app.get('/all', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let idEscuela = req.escuela._id;

    Test.find({idEscuela})
    .populate('preguntas', 'cuestion')
    .exec((err, tests) => {
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

//Obtiene todas las reglas (solo root)
app.get('/allroot', [verificaTokenEscuela, verificaTokenRoot], (req,res) => {

    Test.find({}).populate('idEscuela', 'nombre').exec((err, tests) => {
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