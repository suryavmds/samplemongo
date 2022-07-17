const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const result = dotenv.config()
const FileManager = require('./model/FileManager')
const cookieParser = require('cookie-parser');

const mongoose_url = process.env.MONGOOSE_URL;

if (result.error) {
    throw result.error
}

const PORT = process.env.PORT || 5000;

mongoose.connect(mongoose_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('MongoDB successfully connected'))
.catch(err=>console.log(err));

const mng_db = mongoose.connection

mng_db.once('open',
    ()=>{
        console.log("DB connected")
    }
)

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    var db = {  }
    FileManager.find(db, (err, data) => {
        if (err) {
            res.json({"status":"error"})
        } else {
            res.json({"status":"success","data":data})
        }
    });
})
app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`);
})