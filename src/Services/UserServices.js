const User = require('../auth/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserService{
    constructor(repository){
        this.repository = repository
    }

    register(name, email, password){
        const userExists = this.repository.findUserByEmail(email)
        if(userExists){
            throw new Error('This email was already user by anothe user.')
        } 

        const newUser = new User({name, email, password})
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        this.repository.save(newUser);

        return newUser;
    }

    login(email, password){
        const user = this.repository.findByEmail(email)
        if(!user) throw new Error("User not found")

        const isSamePassword = bcrypt.compareSync(password, user.password)
        if(!isSamePassword){
            throw new Error("Wrong password")
        }

        const token = jwt.sign({id: user.id, email: user.email}, "secretJwt", { expiresIn: "1d" })
        return { token, user }
    }
}

module.exports = UserService