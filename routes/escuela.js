//Paquetes de node
const _ = require('underscore');
const express = require('express');
const qrcode = require('qrcode');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Importaciones locales
const Escuela = require('../models/escuela');
const { verificaTokenEscuela ,verificaTokenEscuela2, verificaTokenRoot } = require('../middlewares/auth');

const app = express();

//Post para agregar una escuela
app.post('/add', [verificaTokenEscuela, verificaTokenRoot] , (req,res) => {

    crypto.randomBytes(5, (err, buf) => {
        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        qrcode.toDataURL(buf.toString('hex'), (err2, data) => {

            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err: err2
                });
            }

            let escuela = new Escuela({
                nickname: req.body.nickname,
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                alumn: req.body.alumn,
                secret: bcrypt.hashSync(buf.toString('hex'), 10),
                qrcode: data
            });

            escuela.save((err3) => {
                if (err3 != null) {
                    return res.status(500).json({
                        ok: false,
                        err: err3
                    });
                }

                res.json({
                    ok: true
                });
            });
        });
    });

});

//Put para editar una escuela
app.put('/update/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','direccion','nickname','alumn']);

    Escuela.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true}, (err, escuela) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            escuela
        });
    });
});

//Obtiene todas las escuelas
app.get('/all', [verificaTokenEscuela, verificaTokenRoot], (req,res) => {

    Escuela.find({}).exec((err, escuelas) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            escuelas
        });
    });

});

//Obtiene una escuela
app.get('/one/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req,res) => {

    let id = req.params.id;
    Escuela.findOne({_id:id}).exec((err, escuela) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            escuela
        });
    });

});

//Borra una escuela
app.delete('/delete/:id', [verificaTokenEscuela, verificaTokenRoot], (req,res) => {

    let id = req.params.id;

    Escuela.findOneAndRemove({_id:id}, (err) => {
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

//Logeo de roots
app.post('/login', (req,res) => {

    let nick = req.body.nickname;
    let tokenX = req.body.token;

    Escuela.findOne({nickname:nick}).exec((err, escuela) => {

        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!escuela) {
            return res.status(500).json({
                ok: false,
                err: "Error en nickname"
            });
        }

        if (!bcrypt.compareSync(tokenX, escuela.secret)){
            return res.status(401).json({
                ok: false,
                err: "Token invalido o expirado"
            });
        }

        let token = jwt.sign({
            escuela
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            escuela,
            token
        });
    });
});

//Genera QR
app.put('/qr/:id', [verificaTokenEscuela, verificaTokenRoot], (req,res) => {

    let id = req.params.id;

    crypto.randomBytes(5, (err, buf) => {
        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        qrcode.toDataURL(buf.toString('hex'), (err2, data) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err: err2
                });
            }

            let body = {
                secret: bcrypt.hashSync(buf.toString('hex'), 10),
                qrcode: data
            }

            Escuela.findOneAndUpdate({ _id: id }, body, (err3, escuela) => {
                if (err3 != null) {
                    return res.status(500).json({
                        ok: false,
                        err3
                    });
                }

                res.json({
                    ok: true,
                    escuela
                });
            });
        });

    });
});


module.exports = app;