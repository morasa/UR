'use strict';
import {user} from './users';
import {menu} from './menus';
import {role} from './roles';
import {menu_role_aciton} from './menuRoleAction';
import { recipe } from './recipes';

const model = {};
model.user = user;
model.menu = menu;
model.role = role;
model.menu_role_aciton = menu_role_aciton;
model.recipe = recipe;

module.exports = model;
