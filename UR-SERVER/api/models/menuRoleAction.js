'use strict';
import mongoose from 'mongoose';

const menuRoleAction_schema = new mongoose.Schema({
  menu_code: {
    type: String,
    required: [true, 'menu name is a required value'],
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
            throw new Error("menu url can't be empty value");
        }
      }
  },
  user_action: {
    type: String,
    required: [true, 'user action is a required value'],
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

export const menu_role_aciton = mongoose.model('menu_role_action', menuRoleAction_schema);