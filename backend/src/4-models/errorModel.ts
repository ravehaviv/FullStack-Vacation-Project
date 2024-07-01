export class errorModel{
    public constructor(public message:string,public status:number){}

}

export class RouteNotFound extends errorModel{
    public constructor(route:string){
    super(`Route "${route}" not exist ` , 400)
    }
}

export class validationErrorModel extends errorModel{
    public constructor(message:string){
    super(message ,404)
    }
}

export class ValidationError extends errorModel {
    public constructor(message: string) {
        super(message, 400);
    }
}

export class ResourceNotFoundErrorModel extends errorModel {
    public constructor(id:number) {
        super(`id ${id} not exist`,404)
    }
}
export class DeleteVecationErrorModel extends errorModel {
    public constructor(id:number) {
        super(`A vacation cannot be deleted due to an incorrect ID = ${id}`,404)
    }
}

export class PhotoNameNotFoundErrorModel extends errorModel {
    public constructor(photo:string) {
        super(`photo ${photo} not exist`,404)
    }
}
export class followError extends errorModel {
    public constructor() {
        super(`Already been follow`,400)
    }
}
export class UnauthorizedErorrModel extends errorModel {
    public constructor() {
        super(`You do not have administrator permission`,400)
    }
}
export class NotLoggedInErrorModel extends errorModel {
    public constructor() {
        super(`You Have To log in`,400)
    }
}


