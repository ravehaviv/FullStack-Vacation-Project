import Joi from "Joi"

class followersModel{

    public userID:number
    public vecation_id:number
   


    constructor(follower:followersModel){

        this.userID = follower.userID
        this.vecation_id = follower.vecation_id
        
       
    }


    public static validationSchema = Joi.object({

        userID: Joi.number().required().positive(),
        vecation_id: Joi.number().required().positive()
        
    });

    public validation():string{
        const resulte = followersModel.validationSchema.validate(this);
        return resulte.error?.message;
    }


}

export default followersModel