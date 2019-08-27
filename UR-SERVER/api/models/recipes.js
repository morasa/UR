'use strict';
import mongoose from 'mongoose';
const ingredient_schema = new mongoose.Schema({
                                ing_name: {
                                  type: String
                                },
                                ing_qty: {
                                  type: String
                                },
                                ing_unit: {
                                  type: String
                                }
                              });

const recipe_schema = new mongoose.Schema({
  recipe_name: {
    type: String
  },
  recipe_description: {
    type: String
  },
  recipe_img_path: {
    type: String
  },
  recipe_no_of_persons: {
    type: String
  },
  recipe_kilo_grams: {
    type: String
  },
  primary_ingredients: {
    type: [ingredient_schema]
  },
  secondary_ingredients: {
    type: [ingredient_schema]
  },
  created_by: {
    type: String
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

export const recipe = mongoose.model('recipe', recipe_schema);

