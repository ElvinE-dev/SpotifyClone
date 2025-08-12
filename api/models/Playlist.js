const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema({
    name: String,
    maker: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    thumbnailPath: String,
    description: String,
    musics: [
        {
            music: {type: mongoose.Schema.Types.ObjectId, ref:'musics'},
            addedAt : {type: Date, default: Date.now},
            _id:false
        }
    ],
})

const PlaylistModel = mongoose.model('playlists', PlaylistSchema);

module.exports = PlaylistModel;