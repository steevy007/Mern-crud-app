const express=require('express');
const route=express.Router();
const friendsModel=require('../../models/friendsModel');

route.get('/', async (req,res)=>{
    friendsModel.find((error,data)=>{
        if(error) return res.send(404).json({msg:"Erreur de recuperation data"});
         res.status(200).json({
            data:data
        });
    })
})

route.post('/save', async (req,res)=>{
    const data={
        nom:req.body.nom,
        age:req.body.age,
        description:req.body.description
    }
    const object=new friendsModel(data);

    object.save((error)=>{
        if(error){
           console.log("Erreur de sauvegarde : ",error);
        }else{
            console.log("Donnee sauvegarder : ",req.body);
        }
    })

    
})

route.put('/update', async (req,res)=>{
      const newAge=req.body.newAge;
      const id=req.body.id;

      try{
        await friendsModel.findById(id,(error,friendUpdate)=>{
            friendUpdate.age=newAge;
            friendUpdate.save((error)=>{
                if(error){
                    console.log("Error : ".error);
                }else{
                    console.log("Update Data Succesfully");
                }
            });

        })
      }catch(err){
          console.log(err);
      }
})


route.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id;

    try{
        await friendsModel.findOneAndDelete(id).exec();
        console.log("Item Delete : ",id);
    }catch(error){
        console.log("Error : ",error);
    }

})

module.exports=route;