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
    },
    alumn: {
        type: Number,
        default: 200
    }
});

escuelaSchema.methods.toJSON = function () {
  let escuela = this;
  let escuelaObject = escuela.toObject();

  escuelaObject.img = `/uploads/escuela/${escuelaObject.img}`;

  delete escuelaObject.secret;

  return escuelaObject;
}


module.exports = mongoose.model('Escuela',escuelaSchema);