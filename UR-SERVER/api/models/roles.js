'use strict';
import mongoose from 'mongoose';

const role_schema = new mongoose.Schema({
  role_name: {
    type: String,
    required: [true, 'role name is a required value'],
    trim: true,
    validate(value){
        if(value == ""){
            throw new Error("menu can't be empty value");
        }
      }
  },
  role_code: {
    type: String,
    required: [true, 'role code is a required value'],
    trim: true,
    validate(value){
        if(value == ""){
            throw new Error("menu code can't be empty value");
        }
      }
  },
  created_by:{
      type:String
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

export const role = mongoose.model('roles', role_schema);