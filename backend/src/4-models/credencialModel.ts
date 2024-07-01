import Joi from "Joi"

class credencialModel{
    public userName:string
    public password:string

    constructor(user:credencialModel){

        this.userName = user.userName
        this.password = user.password
    }

    public static validationSchema = Joi.object({

        userName: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(2).max(30)
    });


    public validtion():string{

        const resulte = credencialModel.validationSchema.validate(this);
        return resulte.error?.message;
    }
    
}

export default credencialModel