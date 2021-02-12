exports.profileUpdate=async (req,res,next)=>{
    try{
        const user=req.user;
        const updates=Object.keys(req.body);
        const allowedUpdates=["name","email","password"]; // more keys will be added
        const checkIt=updates.every((update)=>{
            return allowedUpdates.includes(update);
        });

        if(!checkIt){
            return res.status(400).send({Error:"Invalid updates"});
        } 

        updates.forEach((update)=>{
            user[update]=req.body[update];
        });

        await user.save();
        res.send(user);
    }
    catch (e) {
        res.status(500).send();
    }
}

exports.profileDelete=async(req,res,next)=>{
    try{

        console.log("Jitul teron");
        await req.user.remove();
        res.send({message:"Deleted",user:req.user.extractUser()});
    }
    catch(e){
        res.status(500).send();
    }
}

exports.profileCreate=async(req,res,next)=>{
    try{
            
        const user=new User(req.body);
        const userSaved=await user.save();
        if(!userSaved){
            return res.status(400).send({error:"Something went wrong"});
        }
        res.status(201).send({user:user.extractUser,message:"Saved sucessfully"});

    }
    catch(e){
            res.status(400).send(e);
    }

}

exports.profileRead=async(req,res,next)=>{
    try{
            
        const user=req.user;
        if(user){
            res.send(user.extractUser());
        }

    }
    catch(e){
            res.status(400).send(e);
    }

}
