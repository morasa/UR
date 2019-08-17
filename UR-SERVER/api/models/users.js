'use strict';
import mongoose from 'mongoose';

const user_schema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, 'menu name is a required value'],
    trim: true,
    validate(value){
        if(value == ""){
            throw new Error("menu can't be empty value");
        }
      }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
        if (value.toLowerCase().includes('password')) {
            throw new Error('Password cannot contain "password"')
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

export const user = mongoose.model('users', user_schema);