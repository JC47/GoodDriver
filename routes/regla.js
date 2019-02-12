//Paquetes de node
const _ = require('underscore');
const express = require('express');
//Importaciones locales
const Regla = require('../models/regla');
const { verificaTokenEscuela ,verificaTokenEscuela2 } = require('../middlewares/auth');

const app = express();

//Post para agregar una regla
app.post('/add', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let regla = new Regla({
        idEscuela: req.body.idEscuela,
        titulo: req.body.titulo,
        cuerpo: req.body.cuerpo,
        tags: req.body.tags
    });

    regla.save((err) => {
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

//Put para editar una regla
app.put('/update/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['titulo','cuerpo']);
    let tags_x = req.body.tags;

    Regla.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true}, (err, regla) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Regla.updateOne({_id:id}, { $set: {tags:tags_x}}, (err2, regla2) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }
            res.json({
                ok: true,
                regla2
            });
        });
    });

});

//Obtiene todas las reglas
app.get('/all', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    Regla.find({}).exec((err, reglas) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            reglas
        });
    });

});

//Obtiene una regla
app.get('/one/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;
    Regla.find({_id:id}).exec((err, regla) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            regla
        });
    });

});

//Borra una regla
app.delete('/delete/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;

    Regla.findOneAndRemove({_id:id}, (err) => {
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