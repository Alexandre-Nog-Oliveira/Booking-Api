class UserController{
    constructor(service) {
        this.service = service
    }

    register(req, res){
        const { name, email, password } = req.body

        if(!name |!email|| !password){
            return {code: 400, body:{ message: "name, email and password are required" }};
        }

        try{
            const user = this.service.register(name, email, password)
            return { code:201, body:{ user } }
        }catch(error){
            return { code: 200, body:{message: error.message}}
        }
    }

    login(){

    }
}

module.exports = UserController