const express = require('express')
const getRouter = express.Router()
const postRouter = express.Router()
const patchRouter = express.Router()
const deleteRouter = express.Router()
const Watches = require("../models/watches.model")
const upap = require("../Validator")

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
        const {error,value}=upap(req.body)
        if(error){
            return res.status(400).json(error.details)
        } else{
        console.log(req.body)
        const {WatchID,ModelName,Company,ProducedYear}=req.body;
        const newWatch = await Watches.create({WatchID,ModelName,Company,ProducedYear});
        console.log('new',newWatch);
        res.status(200).json(newWatch);
        }
    } catch(err){
        console.error(err);
        return res.status(500).send({
            error: 'Something went wrong'       
        });
    }

});

patchRouter.patch('/patch/:watchId',async(req,res)=>{
    try{
        console.log("take 1")
        const {error,value}=upap(req.body)
        if(error){  
            console.log("take 2")
            return res.status(400).json(error.details)
        } else{
        const{watchId}=req.params;
        const updatedFields = req.body;

        const updatedWatches = await Watches.findOneAndUpdate({WatchID:watchId},updatedFields,{new:true});

        if (!updatedWatches){
            return res.status(404).json({error: 'Watches not found'});
        }
        
        console.log("updated",updatedWatches);
        res.status(200).json(updatedWatches);
    }

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

module.exports = {getRouter,postRouter,patchRouter,deleteRouter};