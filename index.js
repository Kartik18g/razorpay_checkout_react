const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db/utils");
const Razorpay = require("razorpay");
const app = express();
const cors = require("cors");
dotenv.config();
app.use(cors())
app.use(express.json());
connectDB();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.get("/", (req, res) => res.json("payments server is running"));

app.post("/paymentOrder", async (req, res) => {
  const { amount, order_id } = req.body;
  try {
    const order = await razorpayInstance.orders.create({
      // paise not rupees
      amount: amount,
      currency: "INR",
      // your order in mongoDB
      receipt: order_id,
    });
    res.json(order);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/validate", async (req, res) => {
  
  try {
    // validate the payment
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = crypto.createHmac('sha256', 'tsyDKYqi5wdKEIsgbepIgGPE');
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: 'Transaction not legit!' });
  
      // create document in your db
      
    res.json(order);
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
