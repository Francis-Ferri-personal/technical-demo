import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type: String
    },

    email: {
        type: String
    },

    gender: {
        type: String
    },

    married: {
        type: Boolean
    },

    points: {
        type: Number
    }

})
 
export default mongoose.model("user", userSchema)