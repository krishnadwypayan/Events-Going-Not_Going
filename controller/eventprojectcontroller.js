var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////Mongoose////

////////////////////////////////////////////////////////////////////////////////////////////////////

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', {
    useMongoClient: true
});

mongoose.connection.once('open', function () {
    console.log("connected mongo db success");
}).on('error', function () {
    console.log("connection to  mongo db is failed");
});


const Schema = mongoose.Schema;

const RegisterUserSchema = new Schema({

    username: String,
    password: String,
    email: String

});

const RegisterUser = mongoose.model('registerusercollections', RegisterUserSchema);


//const LoginUserSchema = new Schema({
//
//    username: String,
//    password: String,
//
//});

//const LoginUser = mongoose.model('registerusercollections',LoginUserSchema);




//////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////Routing and Database//////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////



module.exports = function (app) {
    app.get('/login', function (req, res) {
        //res.end("login page");
        res.render('login');
    });

    //    app.get('/register',function(req,res){
    //        
    //      const user = new RegisterUser({
    //        username:"hyderabad",
    //        password:"hyderabad",
    //        email:"hyderabad"
    //      });
    //
    //      user.save().then(function(){
    //            console.log("registered user" + username);
    //      });
    //
    //        //res.end("login page");
    //          res.render('register');
    //    });

    app.get('/home', function (req, res) {
        //res.end("login page");
        res.render('cal');
    });

    app.get('/register', function (req, res) {
        //res.end("login page");
        res.render('register');
    });


    app.post('/signup', urlencodedParser ,function (req, res) {
        console.log("here");
        const user = new RegisterUser({
            username: "req.body.username",
            password: "req.body.password",
            email: "req.body.email"
        });

        user.save().then(function () {
            console.log("registered user" + username);
            //res.json(result);
        });

    });


    app.post('/login_check', urlencodedParser, function (req, res) {


        //username:req.body.username,
        //password:req.body.password,  

        console.log(req.body.username);
        console.log(req.body.password);

        RegisterUser.find({
            username: req.body.username,
            password: req.body.password
        }).then(function (result) {
            console.log("Username password match");
            res.json(result);
        })

    });


};
