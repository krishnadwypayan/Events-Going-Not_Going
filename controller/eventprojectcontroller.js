var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});





//......................................Mongoose..................................................



var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
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

    username: String,
    eventname: String,
    eventdesc: String,
    startdate: String,
    starttime: String,
    enddate: String,
    endtime: String,
    location: String,
    contact: String,
    capacity: Number

});

const CreateEvent = mongoose.model('eventscollections', CreateEventSchema);




const personalisedDBSchema = new Schema({

    username: String,
    eventname: String,
    startdate: String,
    starttime: String,
    enddate: String,
    endtime: String,
    location: String,
    capacity: Number

});

const personalEvent = mongoose.model('personalisedcollections', personalisedDBSchema);





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

        // console.log("req.body.eventname");
        // console.log(req)
        const newevent = new CreateEvent({

            username: req.body.username,
            eventname: req.body.eventname,
            eventdesc: req.body.eventdesc,
            startdate: req.body.startdate,
            starttime: req.body.starttime,
            enddate: req.body.enddate,
            endtime: req.body.endtime,
            location: req.body.location,
            contact: req.body.contact,
            capacity: req.body.capacity


        });

        newevent.save().then(function (result) {
            console.log("created event" + req.body.eventname);

            res.json(result);

            //            CreateEvent.find({}, function (err, result) {
            //                console.log(result);
            //                res.render('homepage', {
            //                    "eventslist": result
            //                });
            //            });
        });

    });



    app.post('/login_check', urlencodedParser, function (req, res) {


        //username:req.body.username,
        //password:req.body.password,  

        //console.log(req.body.username);
        //console.log(req.body.password);

        var username_retrieve = req.body.username;
        console.log(username_retrieve);

        RegisterUser.find({username: req.body.username, password: req.body.password}).then(function (result) {
            console.log("Username password match");
            console.log(result);
            res.json(result);



        });

    });


    app.get('/home', function (req, res) {

        CreateEvent.find({}, function (err, result) {
            console.log(res);
            //extract events
            
            //fill css
            res.render('homepage', {
                "eventslist": result
            });
        });

    });


    app.get('/createEvent', function (req, res) {
        res.render('createEvent');
    })


};
