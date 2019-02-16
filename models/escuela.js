const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let escuelaSchema = new Schema({

    nombre: {
        type: String,
        unique: true,
        required: true
    },
    direccion: {
        type: String,
        unique: true,
        required: true
    },
    secret: {
        type: String,
        unique: true,
        required: true
    },
    img: {
        type: String,
        default: 'school.png'
    },
    tipo: {
        type: String,
        default: 'BASE'
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    qrcode: {
        type: String,
        required: true
    }
});

escuelaSchema.methods.toJSON = function () {
  let escuela = this;
  let escuelaObject = escuela.toObject();

  delete escuelaObject.secret;
  delete escuelaObject.qrcode;

  return escuelaObject;
}


module.exports = mongoose.model('Escuela',escuelaSchema);