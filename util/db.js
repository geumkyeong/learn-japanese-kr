const config = require("../config/keys");
const mongoose = require("mongoose");
const Dictionary = require('../models/dictionary');
const fetchDict = require('./scrapping');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI);
    console.log(`Mongo db connected: ${conn.connection.host}`);
    
    // const result = await fetchDict();
    // console.log(result)

    /* Dictionary.deleteMany({}, (err) => {
      if (err) console.log(err);
      console.log("Initialize Dictionary data");
    }); */

    /* Dictionary.insertMany(result, (err) => { 
      if (err) console.log(err);
    }); */
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
