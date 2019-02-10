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

let verificaTokenAdmin = (req,res,next) => {
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
  verificaTokenAdmin,
  verificaTokenImg
}
