var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});





//......................................Mongoose..................................................



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


const CreateEventSchema = new Schema({

    eventname: String,
    eventdesc: String,
    startdate: String,
    starttime: String,
    enddate: String,
    endtime: String

});

const CreateEvent = mongoose.model('eventscollections', CreateEventSchema);





//......................................Routing and Database..................................................


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

//    app.get('/home', function (req, res) {
//        //res.end("login page");
//        res.render('homepage');
//    });

    app.get('/register', function (req, res) {
        //res.end("login page");
        res.render('register');
    });


    app.post('/signup', urlencodedParser, function (req, res) {
        //console.log(req.body.password);
        const user = new RegisterUser({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        //        alert("inside signup");

        //        


        user.save().then(function (result) {
            console.log("registered user" + username);
            res.json(result);
        });

    });



    app.post('/create_event', urlencodedParser, function (req, res) {

        //console.log("req.body.eventname");

        const newevent = new CreateEvent({

            eventname: req.body.eventname,
            eventdesc: req.body.eventdesc,
            startdate: req.body.startdate,
            starttime: req.body.starttime,
            enddate: req.body.enddate,
            endtime: req.body.endtime

        });

        newevent.save().then(function (result) {
            console.log("created event" + eventname);
            res.json(result);
        });

    });



    app.post('/login_check', urlencodedParser, function (req, res) {


        //username:req.body.username,
        //password:req.body.password,  

        //console.log(req.body.username);
        //console.log(req.body.password);

        RegisterUser.find({
            username: req.body.username,
            password: req.body.password
        }).then(function (result) {
            console.log("Username password match");
            res.json(result);
        })

    });


    app.get('/home', function(req, res) {
        
        CreateEvent.find({}, function(err, result) {
            console.log(result);
            res.render('homepage', {
                "eventslist" : result
            });
        });
        
    });
    
    
    app.get('/time', function(req, res) {
        res.render('time');
    })
    

};
