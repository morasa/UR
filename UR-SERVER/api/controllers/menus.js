import  model  from "../models";
import { ERROR, SUCCESS, STATUS_CODE } from "../config/data/message";

const { menu } = model;

/*Return list of all menus*/
export const list = (req, res) => {
  console.log("Get Menu list::::");
  menu.find({}).then(menusList => res.status(STATUS_CODE.OK)
                                     .send({
                                            success: true,
                                            menusList
                                  })
                ).catch(error => res.status(STATUS_CODE.NOT_FOUND)
                                    .send(error));
};

/*Insert Menu item*/
export const create = (req, res) => {
  console.log("Menu Insert::::");
  const { menu_name, menu_url, menu_code, menu_description, created_by } = req.body;

  menu.create({ menu_name, menu_url, menu_code, menu_description, created_by })
    .then(menuData => res.status(STATUS_CODE.CREATED)
                          .send({
                            success: true,
                            message: SUCCESS.MENU_CREATED,
                            menuData
                          })
    ).catch(error => res.status(STATUS_CODE.CLIENT_ERROR)
                        .send(ERROR.MENU_NOT_CREATED, error));
};

/*@Delete user by Menu Id */
export const deleteById = (req,res)=> {
    console.log("delete User::::", req.params.id);
    menu.findOneAndRemove({ _id: req.params.id })
        .then(menu => res.status(STATUS_CODE.OK)
            .send({
                success: true,
                message: SUCCESS.MENU_DELETED,
                menu
            })
        ).catch(error => res.status(STATUS_CODE.CLIENT_ERROR)
            .send({
                success: false,
                message: ERROR.MENU_NOT_DELETE,
                error
            }));
}
