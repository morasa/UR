import { Router } from "express";
import * as menu from "../controllers/menus";
import * as role from "../controllers/roles";
import * as user from "../controllers/users";
import * as token from "../middleware/verifyToken";
import * as access from "../controllers/menu_role_action";
import * as recipes from "../controllers/recipes";
import { upload } from "../middleware/uploadFile";

export const router = Router();
//login
router.route("/login")
      .post(user.login);
//verify token      
router.route("/api/*")
      .get(token.verifyToken);
//menu api routes
router.route("/api/menus/list")
      .get(menu.list);
router.route("/api/menus/create")
      .post(menu.create);
router.route("/api/menus/delete/:id")
      .delete(menu.deleteById);
//roles api routes
router.route("/api/roles/list")
      .get(role.list);
router.route("/api/roles/create")
      .post(role.create);
router.route("/api/roles/delete/:id")
      .delete(role.deleteRole);	  
//users api routes
router.route("/api/users/:user_code")
      .delete(user.deleteByCode);
router.route("/api/users/list")
      .get(user.list);
router.route("/api/users/create")
      .post(user.create);
router.route("/api/users/:user_code")
      .get(user.findByCode);
router.route("/api/users/:user_code")
      .patch(user.updateByCode);
//menu Access api routes
router.route("/api/access/list")
.get(access.list);
router.route("/api/access/create")
.post(access.create);
router.route("/api/access/delete/:id")
.delete(access.deleteAccess);
router.route("/api/access/list/:role_code")
.get(access.menuList);
//file upload
router.route("/api/upload/recipe")
.get(recipes.list)
.post(upload.single('recipe_img'),recipes.create);

      