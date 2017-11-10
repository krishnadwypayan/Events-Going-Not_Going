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




const requestEventSchema = new Schema({

    username: String,
    eventname: String,

});

const requestEvent = mongoose.model('requesteventscollections', requestEventSchema);




const approveUserSchema = new Schema({

    creator: String,
    user_attending: String,
    eventname: String

});

const approveUser = mongoose.model('approveuserscollections', approveUserSchema);





//....................................Routing and Database.............................................


module.exports = function (app) {

    app.get('/login', function (req, res) {
        //res.end("login page");
        res.render('login');
    });


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

        user.save().then(function (result) {
            console.log("registered user" + username);
            res.json(result);
        });

    });



    app.post('/create_event', urlencodedParser, function (req, res) {

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
            capacity: req.body.capacity,


        });

        newevent.save().then(function (result) {
            console.log("created event" + eventname);
            res.render('homepage');

        });

    });



    app.post('/login_check', urlencodedParser, function (req, res) {



        var username_retrieve = req.body.username;
        console.log(username_retrieve);

        RegisterUser.find({
            username: req.body.username,
            password: req.body.password
        }).then(function (result) {
            console.log("Username password match");
            console.log(result);
            res.json(result);



        });

    });


    app.get('/home', function (req, res) {

        CreateEvent.find({}, function (err, result) {
            console.log(result);
            res.render('homepage', {
                "eventslist": result
            });
        });

    });


    app.get('/createEvent', function (req, res) {
        res.render('createEvent');
    });


    app.post('/viewEvent', urlencodedParser, function (req, res) {

        console.log("notusername " + req.body.notusername_send);

        CreateEvent.find({
            username: {
                '$ne': req.body.notusername_send
            }
        }, function (err, result) {
            console.log(result);
            res.json(result);
        });

    });


    app.post('/request_btn_clicked', urlencodedParser, function (req, res) {
        //console.log(req.body.password);

        var eventname_find = req.body.eventname_request;

        CreateEvent.find({
            eventname: eventname_find
        }).then(function (result) {
            console.log("eventname_find " + req.body.eventname_request);
            console.log("result ki capacity " + result);
            res.json(result);
        });
    });


    app.post('/request_available', urlencodedParser, function (req, res) {


        const request = new requestEvent({
            username: req.body.username_request,
            eventname: req.body.eventname_request
        });

        console.log(request.username + " request kiya for " + request.eventname);

        request.save().then(function (result) {
            console.log("requested for entry to " + request.eventname + " by " + request.username);
            console.log("Sent result is " + result);
            res.render('homepage');
        });

    });


    app.get('/notify', function (req, res) {
        res.render('notifications');
    });


    app.post('/getEventnameForNotification', urlencodedParser, function (req, res) {

        var creator = req.body.creator;
        console.log("getting event created by " + creator);


        CreateEvent.find({
            username: creator,
        }).then(function (result) {
            console.log("getEventFor..." + result);
            res.json(result);
        });



    });

    app.post('/getNotifications', urlencodedParser, function (req, res) {

        var eventname = req.body.eventname;
        console.log("idhar shayaddikkat hai " + eventname);
        requestEvent.find({
            eventname: eventname,
        }).then(function (result) {
            console.log("gadbad..." + result);
            res.json(result);
        });
    });



    app.post('/approve_btn_clicked', urlencodedParser, function (req, res) {
        //console.log(req.body.password);

        var eventname = req.body.eventname;
        console.log(req.body.eventname + " ko approve kiya ");

        requestEvent.findOneAndRemove({
            eventname: req.body.eventname,
            username: req.body.username,
        }).then(function (err, result) {
            console.log("removed" + req.body.username);
        });

        CreateEvent.findOneAndUpdate({
            eventname: eventname
        }, {
            $inc: {
                capacity: "-1"
            }
        }).then(function (err, result) {
            console.log(result.capacity);
            res.json(result);
        });




    });


    app.get('/calendar', function (req, res) {
        res.render('cal');
    });


    app.get('/contactus', function (req, res) {
        res.render('footer');
    });



};
