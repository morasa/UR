import { Router } from "express";
import * as menu from "../controllers/menus";
export const router = Router();

router.route("/api/menus")
      .get(menu.list);