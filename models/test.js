const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let testSchema = new Schema({
    idEscuela: {
        type: Schema.ObjectId,
        ref: 'Escuela',
        required: true
    },
    nivel: {
        type: String
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    preguntas: [{
        type: Schema.ObjectId,
        ref: 'Pregunta'
    }]
});

module.exports = mongoose.model('Test', testSchema);