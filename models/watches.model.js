const mongoose = require ("mongoose");

const WatchesSchema = new mongoose.Schema({
    WatchID : {type : String},
    ModelName : {type : String},
    Company : {type : String},
    ProducedYear : {type : String},
    
},);

module.exports = mongoose.model('watches',WatchesSchema);