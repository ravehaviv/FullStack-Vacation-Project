import Joi from "Joi"
import { UploadedFile } from "express-fileupload"

class vecationModel{

    public id: number
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public price: number
    public image: UploadedFile
    public photoName: string
    

    public constructor(vacation:  vecationModel){

        this.id = vacation.id
        this.destination = vacation.destination
        this.description = vacation.description
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.price = vacation.price
        this.image = vacation.image
        this.photoName = vacation.photoName
       
    }


    public static validationSchema = Joi.object({

        id: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(30),
        description: Joi.string().required().min(2).max(400),
        startDate: Joi.string().required().min(2).max(20),
        endDate: Joi.string().required().min(2).max(20),
        price: Joi.number().required().min(1).max(10000),
        image:Joi.object().optional(),
        photoName: Joi.forbidden()
    });

    public validation():string{
        const resulte = vecationModel.validationSchema.validate(this);
        return resulte.error?.message;
    }


}

export default vecationModel