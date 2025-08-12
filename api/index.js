const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Music = require('./models/Music');
const Playlist = require('./models/Playlist');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder =''

        if(file.fieldname === 'thumbnail'){
            folder = './uploads/thumbnail/'
        }else if(file.fieldname === 'music'){
            folder = './uploads/music/'
        }else if(file.fieldname === 'playlist'){
            folder = './uploads/playlist/'
        }else if(file.fieldname === 'profile'){
            folder = './uploads/profile/'
        }

        cb(null, folder)
    },
});

const upload = multer({storage:storage});
const fs = require('fs');
const path = require('path')
const cookieParser = require('cookie-parser');
const { parseFile } = require('music-metadata'); 

const app = express();

const bcryptSalt = bcrypt.genSaltSync(16);
const jwtSecret = 'PoAOSJD3254KAS0jASDJOPASLID012'

app.use(cors({credentials:true, origin:'http://localhost:5173'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname,'uploads')))
require('dotenv').config() //Buat bisa akses env kalau tak ada ini, baris dibawah tak akan jalan
//ctVStVe0mChpat21
//blabblub303
mongoose.connect(process.env.MONGO_URL)


async function getUserIdViaToken(req){
    const {token} = req.cookies
    if(!token) return;
    const userId = jwt.verify(token, jwtSecret, {}, async function(err, data) {

        return data.id;
    })

    return userId
}

app.get('/test', function(req, res) {
    res.json('hai')
})

app.get('/onplaying', async function(req,res){
    const userId = await getUserIdViaToken(req);

    if(!userId) return;

    const {onplaying} = await User.findById(userId).populate({
        path:'onplaying',
        populate:{
            path:'artist',
            model:'users'
        }
    });

    res.json(onplaying);
})
app.post('/register', async function(req,res){
    try{
        const {username, email, password, gender} = req.body

        const hashedPassword = await bcrypt.hash(password, bcryptSalt)
        
        const userData = await User.create({
            username, email, password:hashedPassword, gender
        })
        
        jwt.sign({
            id: userData._id,
            username: userData.username,
            email: userData.email,
        }, jwtSecret, {}, async function(err, token){
            if (err) throw err;

            res.cookie('token', token).json(userData)
        })
    }catch(err){
        res.status(422).json(err)
    }
})

app.get('/profile', async function (req, res) {
    const {token} = req.cookies; 
    try{
        if(token){
            jwt.verify(token, jwtSecret, {}, async function(err,userData){ 
                const {username, email, _id, description, profilePath, history, searchHistory} = await User.findById(userData.id).populate(
                    {
                        path: 'history',
                        populate : {
                            path:'artist',
                            model: 'users'
                        }
                    }).populate({
                        path:'searchHistory',
                        populate:{
                            path:'artist',
                            model:'users'
                        }
                    })
                res.json({username, email, _id, description, profilePath, history, searchHistory})
            } )
        }else{ 
            res.json(null)
        }
    }catch(err){
        throw err;
    }
})

app.post('/update-profile', upload.fields([{name:'profile', maxCount:1}]), async function(req,res){
    const {userDescription} = req.body

    const userId = await getUserIdViaToken(req);

    if(!userId) return;

    const userData = await User.findById(userId)

    const profileFile = req.files['profile'][0]
    const profilePath = profileFile.path + '.' + profileFile.originalname.split('.')[1];

    fs.renameSync(profileFile.path, profilePath)


    userData.profilePath = profilePath
    userData.description = userDescription

    await userData.save();

    res.json(userData)
})

app.post('/update-search-history', async function(req,res){
    const {searchData} = req.body
    const userId = await getUserIdViaToken(req);

    if(!userId) return;


    const userData = await User.findById(userId);

    const alreadyExists = userData.searchHistory.some(m => m._id?.toString() === searchData._id);

    if(!alreadyExists){
        userData.searchHistory.push(searchData);
        const newUserData = await userData.save()
        res.json(newUserData);
    }else{
        res.json('EXISTED')
    }

})

app.post('/increment-music-count', async function(req,res){
    const {musicId} = req.body;

    const musicData = await Music.findById(musicId);

    musicData.count += 1
    await musicData.save();

    res.json(musicData)

})

app.get('/artist/:artistId', async function(req,res){
    const {artistId} = req.params
    const artistData = await User.findOne({_id: artistId}) 

    res.json(artistData)
})

app.post('/login', async function (req,res){
    const {email, password} = req.body;

    try{
        if(!email || !password) return res.status(422).json('Unable to process');
        const userData = await User.findOne({email})
        if(userData?._id !== null){
            let passOk = bcrypt.compareSync(password, userData.password);
    
            if(passOk){ 
                jwt.sign({
                    id: userData._id,
                    username: userData.username,
                    email:userData.email
                },jwtSecret,{}, function(err, token){
                    if (err) throw err;
                    res.cookie('token', token).json(userData)
                })
            }
        }else{ 
            res.json("UserNotExist");
        }
        
    }catch(err){
        res.status(422).json(err.message)
    }
})
const uploadMiddleware = upload.fields([{name:'music', maxCount:1}, {name:'thumbnail', maxCount:1}])
app.post('/submit-music', uploadMiddleware, async function(req, res){
    const { name, artistId, credits, album, release, lyric } = req.body
    // const {path} = req.file;
    // const newPath = path + '.mp3'

    try{
        const musicFile = req.files['music'][0];
        
        const thumbnailFile = req.files['thumbnail'][0];

        const musicPath = musicFile.path + '.' + musicFile.originalname.split('.')[1];
        const thumbnailPath = thumbnailFile.path + '.' + thumbnailFile.originalname.split('.')[1];

        
        fs.renameSync(musicFile.path, musicPath);
        fs.renameSync(thumbnailFile.path, thumbnailPath);

        const parse = await parseFile(musicPath)
        const duration = Math.floor(parse.format.duration);

        const musicData = await Music.create({
            name, artist:artistId, credits, album, duration, count:0, path:musicPath, release, thumbnailPath, lyric
        }) 

        res.json(musicData)
        
    }catch (err){
        res.json({message: err})
    }
})

app.post('/update-music-history', async function(req,res) {
    const userId = await getUserIdViaToken(req)

    if(!userId) return;

    const {musicId} = req.body;

    const userData = await User.findById(userId)

    
    userData.history.push(musicId);

    userData.history = userData.history.filter((item,index) => {return userData.history.indexOf(item) === index});

    if(userData.history.length > 8){
        userData = userData.history.slice(-8)
    }

    userData.onplaying = musicId

    const newUserData = await userData.save()

    res.json(newUserData);
})

app.get('/musics', async function(req,res) {
    const musicData = await Music.find({}).limit(10).populate('artist');

    res.json(musicData);
})

app.post('/create-playlist', upload.fields([{name:'playlist', maxCount:1}]), async function (req,res){
    try{
        const {maker,name} = req.body
        const playlistFile = req.files['playlist']?.[0];

        let playlistPath

        if(playlistFile){
            playlistPath = playlistFile.path + '.' + playlistFile.originalname.split('.')[1];
            fs.renameSync(playlistFile.path, playlistPath);
        }else{
            playlistPath = ''
        }

        const playlistData = await Playlist.create({
            maker, name, thumbnailPath:playlistPath
        })
        res.json(playlistData)
    }catch(err){
        throw err;
    }
})

app.post('/add-to-playlist', async function (req,res) {
    const {selectedPlaylist, music} = req.body

    const playlistData = await Playlist.findById(selectedPlaylist);

    const alreadyExist = playlistData.musics.some(m => m.music?.toString() === music._id);

    if(!alreadyExist && music.path){
        playlistData.musics.push({music:music._id, addedAt:Date.now()});
        await playlistData.save();
    }else{
        res.status(422).json('Music is missing or Duplicate')
    }

    res.json(music)
})

app.get('/search/:searchParam', async function (req,res){
    const {searchParam} = req.params;
    const regex = new RegExp(searchParam, 'i')

    const musicData = await Music.find({name: {$regex : regex}}).populate('artist').limit(5);


    res.json(musicData)
})


app.get('/get-playlist', async function (req,res){
    try{
        
        const userId = await getUserIdViaToken(req);

        if(!userId) return;

        const playlistsData = await Playlist.find({maker:userId}).populate('maker').populate( {
            path: 'musics.music',
            populate : { 
                path :'artist',
                model:'users'
            },
        })

        if(playlistsData){
            res.json(playlistsData);
        }else{
            res.status(404).json('Not Found')
        }
    }catch(err){
        throw err;
    }
})

app.get('/get-playlist/:playlistId', async function(req,res){
    const { playlistId } = req.params

    const playlistData = await Playlist.findOne({_id:playlistId})
    .populate('maker')
    .populate({
        path: 'musics.music',
        populate: {
            path:'artist',
            model: 'users'
        }
    })

    res.json(playlistData)
})

app.get('/music/:musicId', async function (req,res){
    try{

        const { musicId } = req.params;
        const musicData = await Music.findOne({_id: musicId}).populate('artist');

        if(musicData){
            res.json(musicData);
        }else{
            res.status(404).json('Not Found');
        }
    }catch(err){
        res.json(err)
    }
})

app.get('/get-artist-music/:artistId', async function(req,res){
    try{
        const { artistId } = req.params;

        const artistMusicData = await Music.find({artist:artistId}).populate('artist');

        res.json(artistMusicData)
    }catch(err){
        throw err; 
    }
})

app.get('/artists/:artistName', async function (req,res){
    const { artistName } = req.params;

    const regex = new RegExp(artistName, 'i');
    
    const artistsData = await User.find({username : {$regex:regex}}).limit(5);

    res.json(artistsData);
})

// app.get('/onplaying', async function (req,res) {
    
// })
app.listen(4000)