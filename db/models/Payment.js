const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    // razorpay specific fields
    razorpayOrderId:{
        type:String,
        required:true
    },
    razorpayPaymentId:{
        type:String,
        required:true
    },
    signature:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Payment",PaymentSchema)