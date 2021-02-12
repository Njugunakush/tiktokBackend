import express from 'express';
import Data from './data/data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import Videos from './db/index.js';
import env from 'dotenv';
const app = express();  // instance of an app

//	env vars or you can just say consts
env.config();
app.use(cors());
app.use(express.json());	
// alternative to cors
// ------------------
// app.use((req,res,next)=>{
// 	res.setHeaders('Access-Control-Allow-Origin','*'),
// 	res.setHeaders('Access-Control-Allow-Headers','*'),
// 	next()
// });

// mongo conn
mongoose.connect(
	// for localhost
	// `mongodb://127.0.0.1:27017/${process.env.MONGO_DB_database}`,
	// for online server
	`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mern-ecommerce.ahhtq.mongodb.net/${process.env.MONGO_DB_database}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	}
).then(() => {
	console.log('Database connected')
});

// API end points
app.get('/',(req, res) => res.status(200).send(Data));
app.get('/gt/posts',(req,res)=>{
	Videos.find((err, data)=>{
		if (err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
	})
});

//	posts to the server
app.post('/pt/posts', (req, res)=> {
    const dbVids = req.body

    Videos.create(dbVids, (err, data)=>{
        if (err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})


app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});