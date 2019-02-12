//Paquetes de node
const _ = require('underscore');
const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const jwt = require('jsonwebtoken');
//Importaciones locales
const Escuela = require('../models/escuela');
const { verificaTokenEscuela ,verificaTokenEscuela2, verificaTokenRoot } = require('../middlewares/auth');

const app = express();

//Post para agregar una escuela
app.post('/add', (req,res) => {

    let secret_aux = speakeasy.generateSecret({ length: 20 });

    qrcode.toDataURL(secret_aux.otpauth_url, (err,data) => {

        let escuela = new Escuela({
            nickname: req.body.nickname,
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            secret: secret_aux.base32,
            qrcode: data
        });

        escuela.save((err) => {
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

//Put para editar una escuela
app.put('/update/:id', [verificaTokenEscuela, verificaTokenEscuela2], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','direccion','nickname']);

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
    Escuela.find({_id:id}).exec((err, escuela) => {
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

        let verified = speakeasy.totp.verify({
            secret: escuela.secret,
            encoding: 'base32',
            token:tokenX
        });
        
        if(!verified){
            return res.status(401).json({
                ok:false,
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

    let secret_aux = speakeasy.generateSecret({ length: 20 });

    qrcode.toDataURL(secret_aux.otpauth_url, (err, data) => {

        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let body = {
            secret:secret_aux,
            qrcode:data
        }
        
        Escuela.findOneAndUpdate({_id:id}, body, (err2,escuela) => {
            if(err2 != null){
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }

            res.json({
                ok:true,
                escuela
            });
        });
    });

});


module.exports = app;