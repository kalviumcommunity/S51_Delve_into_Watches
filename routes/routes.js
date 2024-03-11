const express = require('express')
const getRouter = express.Router()
const postRouter = express.Router()
const patchRouter = express.Router()
const deleteRouter = express.Router()
require("dotenv").config()
const Watches = require("../models/watches.model")
const jwt=require("jsonwebtoken")
const User=require("../models/user.model")
const bcrypt=require("bcrypt")


getRouter.get('/get',async(req,res)=>{
    try{
        const watches = await Watches.find()
        res.status(200).json(watches)
    } catch (err){
        console.log(err)
    }
})

postRouter.post('/post',async(req,res)=>{
    try{
        console.log(req.body)
        const {WatchID,ModelName,Company,ProducedYear,Createdby}=req.body;
        const newWatch = await Watches.create({WatchID,ModelName,Company,ProducedYear,Createdby});
        console.log('new',newWatch);
        res.status(200).json(newWatch);
    } catch(err){
        console.error(err);
        return res.status(500).send({
            error: 'Something went wrong'       
        });
    }
});

postRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("user", username, password)

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid =  bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const sec = "4ebcff60e04e6b06fa9f9cf6e3aeb8a5876a6a659514e44b0c6c3ed8575473a9"
        
        // const access_token = process.env.ACCESS_TOKEN
        // console.log("Access Token:", access_token);
        const token = jwt.sign({ username: user.username }, sec);

        res.cookie('token', token, { httpOnly: true });
        console.log("token", token, user.username)
        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

patchRouter.patch('/patch/:watchId',async(req,res)=>{
    try{
        const{watchId}=req.params;
        const updatedFields = req.body;

        const updatedWatches = await Watches.findOneAndUpdate({WatchID:watchId},updatedFields,{new:true});

        if (!updatedWatches){
            return res.status(404).json({error: 'Watches not found'});
        }
        
        console.log("updated",updatedWatches);
        res.status(200).json(updatedWatches);

    } catch(err){
        console.error(err);
        return res.status(500).json({
            error: 'Something went Wrong'
        });
    }
});

deleteRouter.delete('/delete/:watchId',async(req,res)=>{
    try{
        const {watchId} = req.params;
        const deleteFields = req.body;
        console.log(req.body)
        const deleteWatches = await Watches.findOneAndDelete({WatchID:watchId}, deleteFields, {new: true});

        if (!deleteWatches){
            return res.status(404).json({error: 'Watches not deleted'});
        }

        console.log("deleted",deleteWatches);
        res.status(200).json(deleteWatches);
    } catch(err){
        console.error(err);
        return res.status(500).json({error: 'Something went wrong'});
    }
})

getRouter.get('/logout',(req,res)=>{
    res.clearCookie('token')
})

module.exports = {getRouter,postRouter,patchRouter,deleteRouter};