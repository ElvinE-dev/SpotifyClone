const mongoose = require('mongoose');


const MusicSchema = mongoose.Schema({
    name: String,
    path: String,
    thumbnailPath: String,
    artist: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
    count: Number,
    duration: Number,
    album: String,
    release: Number,
    lyric: String,
    credits: [
        {
            name: String,
            role: String
        }
    ],

})

const MusicModel = mongoose.model('musics', MusicSchema)

module.exports = MusicModel;

