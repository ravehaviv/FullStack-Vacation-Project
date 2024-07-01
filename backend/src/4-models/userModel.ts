import roleModle from "./roleModel"
import Joi from "Joi"

class userModel{

    public userID:number
    public firstName:string
    public lastName:string
    public userName:string
    public password:string
    public userRole:roleModle


    constructor(user:userModel){

        this.userID = user.userID
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.userName = user.userName
        this.password = user.password
        this.userRole = user.userRole
    }


    public static validationSchema = Joi.object({

        userID: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(2).max(30).messages({
            'string.empty':"First Name is required",
            'string.min':"First Name is required of min 2 characters",
            'string.max':"First Name is required of max 30 characters",
        }),
        lastName: Joi.string().required().min(2).max(30).messages({
            'string.empty':"Last Name is required",
            'string.min':"Last Name is required of min 2 characters",
            'string.max':"Last Name is required of max 30 characters",
        }),
        userName: Joi.string().required().min(2).max(30).messages({
            'string.empty':"User Name is required",
            'string.min':"User Name is required of min 2 characters",
            'string.max':"User Name is required of max 30 characters",
        }),
        password: Joi.string().required().min(2).max(30).messages({
            'string.empty':"Password is required",
            'string.min':"Password is required of min 2 characters",
            'string.max':"Password is required of max 30 characters",
        }),
        userRole: Joi.forbidden()
    });

    public validation():string{
        const resulte = userModel.validationSchema.validate(this);
        return resulte.error?.message;
    }


}

export default userModel