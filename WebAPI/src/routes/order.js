const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
const passport = require("passport");
const router = express.Router();

//import orderHeader and orderDetail models
const Order = require("../models/ordermodel");

//Token verification method
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretkey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}


//user root level => /user
router.get("/", (req, res) => {
    res.send("From Item endpoint");
  });

  router.get("/items", async (req, res) => {
    try {
      let items = await Item.find();
      res.send(items);
    } catch (ex) {
      return res.status(500).send("Error", err.message);
    }
  });

  router.post("/orders", async (req, res) => {
    if (!req.body.userId) {
      res.status(400).send("Not all mandatory values are sent");
      return;
    }
  
    const orderIdAutoValue=0;  
    let order = new Order({
        userId: req.body.userId,
        orderDate: req.body.orderDate,
        subTotal: req.body.subTotal,
        orderDetail:req.body.orderDetail
      });

      order = await order.save();
    res.send(order);
  });

  module.exports = router;