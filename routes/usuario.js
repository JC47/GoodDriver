//Paquetes de node
const _ = require('underscore');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Importaciones locales
const Test = require('../models/test');
const Usuario = require('../models/usuario');
const Escuela = require('../models/escuela');
const Regla = require('../models/regla');
const Consejo = require('../models/consejo');
const { verificaTokenEscuela,verificaTokenUser,verificaTokenRoot } = require('../middlewares/auth');

const app = express();

//Para registrarse
app.post('/signup', (req,res) => {

    Escuela.findOne({tipo:'ROOT'}, (err,escuela) => {
        if(err != null){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        let usuario = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            cursos: [escuela._id]
        });

        usuario.save((err2) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }

            res.json({ok:true});
        })
    });
});

//Logeo del usuario
app.post('/login', (req,res) => {
    let email = req.body.email;
    let pass = req.body.password;

    Usuario.findOne({email}, (err, usuario) => {
        if(err != null) {
            return res.status(500).json({
                ok:false,
                err
            });
        }      

    if(!usuario){
      return res.status(500).json({
        ok:false,
        err: "El (usuario) o contraseña incorrectos"
      });
    }

    if(!bcrypt.compareSync(pass,usuario.password)){
      return res.status(500).json({
        ok:false,
        err: "El usuario o (contraseña) incorrectos"
      });
    }

    let token = jwt.sign({
      usuario:usuario,
    },process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN});

    res.json({
      ok:true,
      usuario: usuario,
      token
    });

  });
});

//Para unirse a una escuela
app.put('/join', [verificaTokenUser], (req,res) => {

    let idEscuela = req.body.idEscuela;
    let idUsuario = req.usuario._id;

    Usuario.findOneAndUpdate({_id:idUsuario}, {$push: {cursos: idEscuela}}, (err) => {

        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Usuario.findOne({_id:idUsuario}).populate('cursos', 'nombre').exec( (err2, usuario) => {
            if(err2 != null){
                return res.status(500).json({
                       ok: false,
                       err2
                });
            }

            res.json({
                ok:true,
                usuario
            });
        });

    });
});

//Para dejar una escuela
app.put('/leave', [verificaTokenUser], (req,res) => {
    
    let idEscuela = req.body.idEscuela;
    let idUsuario = req.usuario._id;

    Usuario.findOne({_id:idUsuario}, (err, usuario) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        usuario.cursos.remove(idEscuela);

        usuario.save((err2, usuarioN) => {
            if(err2 != null){
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }

            res.json({
                ok: true,
                usuario: usuarioN
            });
        });
    });
});

//Put para editar un usuario
app.put('/update/:id', [verificaTokenUser], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','password']);
    Usuario.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true}, (err, usuario) => {
        if(err != null){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario
        });
    });
});
//Borra un consejo
app.delete('/delete/:id', [verificaTokenEscuela, verificaTokenRoot], (req,res) => {

    let id = req.params.id;

    Usuario.findOneAndRemove({_id:id}, (err) => {
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

//Obtiene todos los usuarios
app.get('/all', [verificaTokenEscuela, verificaTokenRoot], (req, res) => {

    Usuario.find({}).populate('cursos', 'nombre').exec((err, usuarios) => {
        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarios
        });
    });

});

//Obtiene reglas para el usuario
app.get('/getreglas', [verificaTokenUser], (req,res) => {

    Usuario.findOne({_id:req.usuario._id}).exec( (err, usuario) => {
        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Regla.find({ idEscuela: {$in: usuario.cursos}}).exec((err2, reglas) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }

            res.json({
                ok:true,
                reglas
            });
        });
    });
});

//Obtiene consejos para el usuario
app.get('/getconsejos', [verificaTokenUser], (req,res) => {

    Usuario.findOne({_id:req.usuario._id}).exec( (err, usuario) => {
        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Consejo.find({ idEscuela: {$in: usuario.cursos}}).exec((err2, consejos) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }

            res.json({
                ok:true,
                consejos
            });
        });
    });
});


//Obtiene tests para el usuario
app.get('/gettests', [verificaTokenUser], (req,res) => {

    Usuario.findOne({_id:req.usuario._id}).exec( (err, usuario) => {
        if (err != null) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Test.find({ idEscuela: {$in: usuario.cursos}}).exec((err2, tests) => {
            if (err2 != null) {
                return res.status(500).json({
                    ok: false,
                    err2
                });
            }

            let testR = tests.forEach( (test) => delete test.preguntas );

            console.log(testR);
            console.log(tests)

            res.json({
                ok:true,
                tests
            });
        });
    });
});



module.exports = app;