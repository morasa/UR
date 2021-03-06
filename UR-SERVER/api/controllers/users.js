import  model  from "../models";
import { ERROR, SUCCESS, STATUS_CODE } from "../config/data/message";
import { privateKey } from "../config/data/secure";
import jwt from "jsonwebtoken";

const { user } = model;
/*@Returns list of uses */
export const list = (req,res)=>{
    console.log("GET USER LIST::::");
    user.find({})
        .then(usersList => res.status(STATUS_CODE.OK)
                              .send({
                                success: true,
                                usersList
                            })
        )
        .catch(error => res.status(STATUS_CODE.NOT_FOUND)
                            .send(error));
};

/*@Insert User */
export const create = (req,res)=>{
    console.log("Create User::::");
    let password="1234567";
    const {user_name,email,role_code,created_by,user_code} = req.body;

    console.log("CheckUser", req.body);
    user.create({user_name,email,password,role_code,created_by,user_code})
                          .then(user => res.status(STATUS_CODE.CREATED)
                                                .send({
                                                  success: true,
                                                  message: SUCCESS.USER_CREATED,
                                                  user
                                                })
                          ).catch(error => res.status(STATUS_CODE.CLIENT_ERROR)
                                              .send({
                                                        success:false,
                                                        message: ERROR.USER_NOT_CREATED,
                                                        error
                                                    }));

};
/*@Delete user by role code */
export const deleteByCode = (req,res)=> {
    console.log("delete User::::", req.params.user_code);
    user.findOneAndRemove({ user_code: req.params.user_code })
        .then(user => res.status(STATUS_CODE.OK)
            .send({
                success: true,
                message: SUCCESS.USER_DELETED,
                user
            })
        ).catch(error => res.status(STATUS_CODE.CLIENT_ERROR)
            .send({
                success: false,
                message: ERROR.USER_NOT_CREATED,
                error
            }));
}

export const findByCode = async (req,res) =>{
    console.log("GET USER BY ID");
    const user_code = req.params.user_code
    console.log(user_code);
    try {
        const userobj = await user.findOne({'user_code':+user_code});
        console.log(userobj);
        if (!userobj) {
            return res.status(404).send();
        }

        res.send(userobj);
    } catch (e) {
        res.status(500).send(e);
    }
}


export const updateByCode = async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['user_name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const userobj = await user.findOneAndUpdate({ user_code: +req.params.user_code }, req.body, { new: true, runValidators: true })
        console.log("user", userobj);
        if (!userobj) {
            return res.status(404).send()
        }

        res.send(userobj)
    } catch (e) {
        console.log("check error", e);
        res.status(400).send(e)
    }
}

export const login = async (req,res) =>{
    console.info("REQUEST:Login");
    try {
        const {email, password } = req.body; 
        
        const userobj = await user.findOne({'email':email,'password':password});

        if (!userobj) {
            return res.status(404).send({
										success: false,
										message: "Worng Credentials"
									});
        }
		console.info("User Avilable");
        const payload = {email, password };
		
		//Generate Token
        const token = jwt.sign(payload,privateKey);
		
		const defaultUrl = (userobj.role_code=="suadmin")?"/admin":"/recipies";
		
		const user_details = {
								email:userobj.email,
								user_code:userobj.user_code,
                                user_name:userobj.user_name,
                                user_role:userobj.role_code
							};
							
		const response_body = {
                success: true,
                message: SUCCESS.VALID_USER,
                user:user_details,
				defaultUrl,
                token
            };
			
        res.status(STATUS_CODE.OK).send(response_body);
    } catch (e) {
        res.status(500).send(e);
    }
}