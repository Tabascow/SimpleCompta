'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
  title: String,
  date: {type:String,default:Date.now},
    amount:{type:Number,default:0},
  author:{type:Schema.Types.ObjectId,ref:'User'}
});

ExpenseSchema.statics={
    loadRecent:function(cb){
        this.find({})
            .populate({path:'author',select:'name'})
            .sort('-date')
            .limit(20)
            .exec(cb);
    }
};

module.exports = mongoose.model('Expense', ExpenseSchema);