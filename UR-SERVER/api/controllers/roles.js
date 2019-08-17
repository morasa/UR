import  model  from "../models";
import { ERROR, SUCCESS, STATUS_CODE } from "../config/data/message";

const { role } = model;

/*Return list of all menus*/
export const list = (req, res) => {
    console.log("Get Roles list::::");
    role.find({}).then(rolseList => res.status(STATUS_CODE.OK)
                                       .send({
                                              success: true,
                                              rolseList
                                    })
                  ).catch(error => res.status(STATUS_CODE.NOT_FOUND)
                                      .send(error));
  };

/*@Create Rolese */
export const create = (req, res) => {
    console.log("Create a Role");

    const {role_name,role_code,created_by,created_on} = req.body;

    role.create({role_name,role_code,created_by,created_on})
        .then(role => res.status(STATUS_CODE.CREATED)
                        .send({
                        success: true,
                        message: SUCCESS.ROLE_CREATED,
                        role
                      })
         )
        .catch(error => res.status(STATUS_CODE.CLIENT_ERROR)
                          .send(ERROR.MENU_NOT_CREATED, error)
        )
};

