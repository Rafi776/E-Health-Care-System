exports.isAdmin = (req,res,next)=>{
    if(req.session.user){
        if(req.session.user.category!=="admin"){
            return res.redirect("/login");
          }
    }else{
        return res.redirect("/login");
    }
  
    next();
};

exports.isDoctor= (req,res,next)=>{
    if(req.session.user){
        if(req.session.user.category!=="doctor"){
            return res.redirect("/login");
          }
    }else{
        return res.redirect("/login");
    }
  
    next();
};

exports.isPatient = (req,res,next)=>{
    if(req.session.user){
        if(req.session.user.category!=="patient"){
            return res.redirect("/login");
          }
    }else{
        return res.redirect("/login");
    }
  
    next();
};

exports.isAuthenticated = (req,res,next)=>{
    if(!req.session.user){
        res.redirect("/login");
    }

    next();
};