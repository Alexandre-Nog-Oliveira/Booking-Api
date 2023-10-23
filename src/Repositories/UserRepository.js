class UserRepository{
    constructor(){
        this.users = []
    }

    findUserByEmail(email){
        return this.users.find((user) => email === user.email)
    }

    save(user){
        this.users.push(user)
    }
}

module.exports = UserRepository