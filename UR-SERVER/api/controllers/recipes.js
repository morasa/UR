import  model  from "../models";
import { ERROR, SUCCESS, STATUS_CODE } from "../config/data/message";

const { recipe } = model;

/*Insert Recipe item*/
export const create = (req, res) => {
  console.log(req.file);
  console.log(req.body);

  let recipe_img_path = req.file.filename;
  const { recipe_name, 
          recipe_description,
          recipe_no_of_persons,
          recipe_kilo_grams,
          ing_primary_ingredients,
          ing_secondary_ingredients,
          created_by,
          is_published } = req.body;

      let primary_ingredients = JSON.parse(ing_primary_ingredients);
      let secondary_ingredients = JSON.parse(ing_secondary_ingredients);

      
  recipe.create({ recipe_name,recipe_description,recipe_img_path,recipe_no_of_persons,recipe_kilo_grams,primary_ingredients,secondary_ingredients,created_by,is_published})
        .then(role => res.status(STATUS_CODE.CREATED)
                        .send({
                                success: true,
                                message: SUCCESS.RECIPE_CREATED,
                                role
                              })
      )
      .catch(error => res.status(STATUS_CODE.CLIENT_ERROR)
          .send(ERROR.RECIPE_NOT_CREATED, error)
      );
      
};

/*Return list of all menus*/
export const list = (req, res) => {
  console.log("Get Recipies list::::");
  recipe.find({}).then(recipieList => res.status(STATUS_CODE.OK)
                                     .send({
                                            success: true,
                                            recipieList
                                  })
                ).catch(error => res.status(STATUS_CODE.NOT_FOUND)
                                    .send(error));
};

/*Return list of all menus*/
export const byUserName = (req, res) => {
  console.log("Get Recipies list::::");
  const user_code = req.params.user_code;
  recipe.find({'created_by':user_code,"is_published":"yes"}).then(recipieList => res.status(STATUS_CODE.OK)
                                     .send({
                                            success: true,
                                            recipieList
                                  })
                ).catch(error => res.status(STATUS_CODE.NOT_FOUND)
                                    .send(error));
};


export const publishRecipe = (req, res) => {
  const {_id} = req.body;

  recipe.findOneAndUpdate({'_id':_id},{"is_published":"yes"}).then(recipieList => res.status(STATUS_CODE.OK)
                  .send({
                        success: true,
                        recipieList
                })
                ).catch(error => res.status(STATUS_CODE.NOT_FOUND)
                .send(error));
}


