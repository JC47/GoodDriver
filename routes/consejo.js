//Paquetes de node
const _ = require('underscore');
const express = require('express');
//Importaciones locales
const Consejo = require('../models/consejo');
const { verificaTokenEscuela ,verificaTokenEscuela2, verificaTokenRoot } = require('../middlewares/auth');

const app = express();

//Post para agregar un consejo
app.post('/add', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let consejo = new Consejo({
        idEscuela: req.body.idEscuela,
        titulo: req.body.titulo,
        cuerpo: req.body.cuerpo,
        tags: req.body.tags
    });

    consejo.save((err) => {
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

//Put para editar un consejo
app.put('/update/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['titulo','cuerpo']);
    let tags_x = req.body.tags;

    Consejo.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true}, (err, consejo) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Consejo.updateOne({_id:id}, { $set: {tags:tags_x}}, (err2, consejo2) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }
            res.json({
                ok: true,
                consejo2
            });
        });
    });

});

//Obtiene todos los consejos de esa escuela
app.get('/all', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let idEscuela = req.escuela._id;

    Consejo.find({idEscuela}).exec((err, consejos) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            consejos
        });
    });

});

//Obtiene todos los consejos (solo root)
app.get('/allroot', [verificaTokenEscuela, verificaTokenRoot], (req,res) => {

    Consejo.find({}).populate('idEscuela', 'nombre').exec((err, consejos) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            consejos
        });
    });
    
});

//Obtiene un consejo de esa escuela
app.get('/one/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;
    Consejo.find({_id:id}).exec((err, consejo) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            consejo
        });
    });

});

//Borra un consejo
app.delete('/delete/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;

    Consejo.findOneAndRemove({_id:id}, (err) => {
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