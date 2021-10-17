


class UserController{

    static UserLogin(req,res){

    }

    static Signup(req , res){

    }
    static SiginPage(req,res){
        res.render(path.join(__dirname , '../views/UserPage.html'));
    }
    

}



module.exports = Login;