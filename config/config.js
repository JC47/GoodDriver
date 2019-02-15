// ================================================
// Entorno
// ================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ================================================
// Puerto
// ================================================
process.env.PORT = process.env.PORT || 3000;

// ================================================
// Vencimiento del token
// ================================================
process.env.CADUCIDAD_TOKEN = '15 days';

// ================================================
// Semilla
// ================================================
process.env.SEED = process.env.SEED || 'este-es-el-seed';

// ================================================
// DB
// ================================================
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/gooddriver";
}
else {
    urlDB = "mongodb://root:cornelio96@ds155150.mlab.com:55150/gooddriver";
}
process.env.URLDB = urlDB;