'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RevenueSchema = new Schema({
    title: String,
    date: {type:String,default:Date.now},
    amountInCash:{type:Number,default:0},
    amountInCheque:{type:Number,default:0},
    amountInCb:{type:Number,default:0},
    user:{type:Schema.Types.ObjectId,ref:'User'}
});

RevenueSchema.statics={
    loadRecent:function(userId,cb){
        this.find({'user':userId})
            .populate({path:'user',select:'name'})
            .sort('-date')
            .limit(20)
            .exec(cb);
    }
};

module.exports = mongoose.model('Revenue', RevenueSchema);
