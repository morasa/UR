import  model  from "../models";
import { ERROR, SUCCESS, STATUS_CODE } from "../config/data/message";

const { menu_role_aciton } = model;

/*Return list of all menus*/
export const list = (req, res) => {
    console.log("Get MRA list::::");
    menu_role_aciton.find({}).then(MRA_List => res.status(STATUS_CODE.OK)
                                       .send({
                                              success: true,
                                              MRA_List
                                    })
                  ).catch(error => res.status(STATUS_CODE.NOT_FOUND)
                                      .send(error));
  };

/*@Create Rolese */
export const create = (req, res) => {

    const {menu_code,role_code,user_action,created_by} = req.body;

    menu_role_aciton.create({menu_code,role_code,user_action,created_by})
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
/*@delete role*/
export const deleteAccess = async (req, res) => {
    try{
        
        const { id } = req.params;
		
        const roleCollection = await menu_role_aciton.find({_id: id,});
        if (!roleCollection) {
              res.status(400).send(ERROR.USER);
        }
        res.status(200).send({
                        success: true,
                        message: SUCCESS.ROLE_DELETED,
                        roleCollection
                      });
    }catch (e) {
            res.status(500).send({ error:ERROR.USER,e})
    }
};
//menuList
export const menuList = async (req, res) => {
    try{
        
        const { role_code } = req.params;
		
        const roleCollection = await menu_role_aciton.find({role_code: role_code,});
        if (!roleCollection) {
              res.status(400).send(ERROR.USER);
        }
        res.status(200).send({
                        success: true,
                        message: SUCCESS.ROLE_DELETED,
                        roleCollection
                      });
    }catch (e) {
            res.status(500).send({ error:ERROR.USER,e})
    }
};