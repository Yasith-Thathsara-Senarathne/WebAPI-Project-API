const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
const passport = require("passport");
const router = express.Router();

//import usermodel
const Item = require("../models/itemmodel");

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

  module.exports = router;