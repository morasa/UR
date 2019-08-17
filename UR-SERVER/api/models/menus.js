'use strict';
import mongoose from 'mongoose';

const menu_schema = new mongoose.Schema({
  menu_name: {
    type: String,
    required: [true, 'menu name is a required value'],
    trim: true,
    validate(value){
        if(value == ""){
            throw new Error("menu can't be empty value");
        }
      }
  },
  menu_url: {
    type: String,
    required: [true, 'menu url is a required value'],
    trim: true,
    validate(value){
        if(value == ""){
            throw new Error("menu url can't be empty value");
        }
      }
  },
  menu_code: {
    type: String,
    required: [true, 'menu code is a required value'],
    trim: true,
    validate(value){
        if(value == ""){
            throw new Error("menu code can't be empty value");
        }
      }
  },
  menu_description: {
    type: String
  },
  created_by:{
      type:String
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

export const menu = mongoose.model('menus', menu_schema);