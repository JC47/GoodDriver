const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let consejoSchema = new Schema({
    idEscuela: {
        type: Schema.ObjectId,
        ref: "Escuela",
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    cuerpo: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }]
});

module.exports = mongoose.model('Consejo', consejoSchema);