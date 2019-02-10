const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reglaSchema = new Schema({

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
    tags: [{type: Strimg}]

});

module.exports = mongoose.model('Regla', reglaSchema);