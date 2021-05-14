const mongoose = require('mongoose');

const categories =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String, required: true},
    slug:{type: String, unique: true},
    parent:{type: String},
    createdAt:Date,
    createdBy : {type:mongoose.Schema.Types.ObjectId,ref:'Admin'},
    updateAt : Date,
    updateBy : {type:mongoose.Schema.Types.Object, ref:'Admin'} 
});

module.exports = mongoose.model('Category',categorySchema);