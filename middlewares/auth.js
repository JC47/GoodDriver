const jwt = require('jsonwebtoken');

// ==================
// Verificar token usuario
// ==================

let verificaTokenUser = (req,res,next) => {
  let token = req.get('Authorization');

  jwt.verify (token, process.env.SEED, (err, decoded) => {
    if(err){
      return res.status(401).json({
        ok:false,
        err
      });
    }

    req.usuario = decoded.usuario;

    next();
  });
};

// ==================
// Verificar token escuela
// ==================

let verificaTokenEscuela = (req,res,next) => {
  let token = req.get('Authorization');

  jwt.verify (token, process.env.SEED, (err, decoded) => {
    if(err){
      return res.status(401).json({
        ok:false,
        err
      });
    }

    req.escuela = decoded.escuela;

    next();
  });
};

let verificaTokenEscuela2 = (req, res, next) => {

  let idescuela = req.body.idescuela != null ? req.body.idescuela : req.params.id;
  
  if(req.escuela._id != idescuela && req.escuela.tipo != 'ROOT'){
    return res.status(401).json({
      ok: false,
      err: 'No autorizado'
    });
  }

  next();
}

let verificaTokenRoot = (req, res, next) => {

  if(req.escuela.tipo != 'ROOT'){
    return res.status(401).json({
      ok: false,
      err: 'No autorizado'
    });
  }

  next();
}

let verificaTokenImg = (req, res, next) => {
  let token = req.query.token;

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      });
    }
    next();
  });
}

module.exports = {
  verificaTokenUser,
  verificaTokenEscuela2,
  verificaTokenEscuela,
  verificaTokenRoot,
  verificaTokenImg
}
