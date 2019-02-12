const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let preguntaSchema = new Schema({

    cuestion: {
        type: String,
        required: true
    },
    respuestas: [{
        respuesta: {type: String, required: true},
        correcta: {type: Boolean, required: true, default: false}
    }]

});

module.exports = mongoose.model('Pregunta', preguntaSchema);