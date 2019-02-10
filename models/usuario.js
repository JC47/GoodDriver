const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  img:{
    type: String,
    default: "no-user.png"
  },
  google: {
    default: false,
    type: Boolean
  },
  cursos: [{
     type: Schema.ObjectId, ref: "Escuela"
  }],
  tests: [{
      test: {type: Schema.ObjectId, ref: 'Test'},
      calificacion: {type:Number, default: 0}
  }]
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  delete userObject.password;

  return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);
