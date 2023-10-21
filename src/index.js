const app = require("./app")

const start = async () => {
    
    try{
        await app.listen({port: 3000})
        app.log.info(`Server is running`)
    }catch(error){
        app.log.error(error)
        process.exit(1)
    }
}

start()