'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var paiementMethods = ['Cash','CB','Cheque']


var ExpenseSchema = new Schema({
    title: String,
    date: {type:String,default:Date.now},
    amount:{type:Number,default:0},
    paiementMethod:{type:String,enum:paiementMethods},
    user:{type:Schema.Types.ObjectId,ref:'User'}
});

ExpenseSchema.statics={
    loadRecent:function(userId,cb){
        this.find({'user':userId})
            .populate({path:'user',select:'name'})
            .sort('-date')
            .limit(20)
            .exec(cb);
    }
};

module.exports = mongoose.model('Expense', ExpenseSchema);
