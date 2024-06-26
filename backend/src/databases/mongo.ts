import moongose from 'mongoose'
import {mongo_ip, mongo_port} from "../config/config"


const connect_mongodb = async () => {
    await moongose.connect(`mongodb://${mongo_ip}:${mongo_port}/test`)
    console.log("MongoDB connection stablished")
}  

export default connect_mongodb