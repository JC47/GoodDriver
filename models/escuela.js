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
        unique: true,
        default: 'school.png'
    },
    curso: {
        type: String,
        unique: true,
        required: true
    }
});

escuelaSchema.methods.toJSON = function () {
  let escuela = this;
  let escuelaObject = escuela.toObject();

  delete escuelaObject.curso;

  return escuelaObject;
}


module.exports = mongoose.model('Escuela',escuelaSchema);