const mongoose = require('mongoose');

const {Schema} = mongoose

const UserSchema = new Schema({
    username: String,
    password: String,
    profilePath: String,
    description: String,
    searchHistory: [
            {type: mongoose.Schema.Types.ObjectId, ref:'musics'}
    ],
    history: [{type: mongoose.Schema.Types.ObjectId, ref:'musics'}],
    onplaying: {type: mongoose.Schema.Types.ObjectId, ref:'musics'},
    email: {type:String, unique:true}
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel;
