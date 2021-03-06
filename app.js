var express             = require('express');
var socket              = require('socket.io');
var path                = require('path');
var bodyParser          = require('body-parser');
var config              = require('./config/database');
var mongoose            = require('mongoose');
var bcrypt              = require('bcrypt');
var morgan              = require('morgan');
var passport            = require('passport');
var expressJWT          = require('express-jwt');
var cors                = require('cors');


mongoose.connect(config.database, function(error) {
    console.log(error);
  });

var db                  = mongoose.connection;
var MongoStore = require('connect-mongo');

// bring in passport strategy we just defined
require('./config/passport')(passport);

// Init App
var app = express();


// Declaration Models
var User        = require('./models/user');
var Equipe      = require('./models/equipe');
var Match       = require('./models/match');
var Phase       = require('./models/phase');
var Prono       = require('./models/prono');
var Buteur      = require('./models/buteur');
var Boost       = require('./models/boost');
var AchatBoost  = require('./models/achatBoost');
var Phase       = require('./models/phase');


app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization,Client-Security-Token");
    next();
});

app.options('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS");
    response.send();
});

app.use(bodyParser.json());                         // Parseir applciation/json
app.use(bodyParser.urlencoded({extended: false}));  // Pour parser dans la BD
app.use(morgan('dev'));                             // voir log status des pages
app.use(passport.initialize());                     // initialise passport for user
app.use(cors());

/*------------Declaration Routes Avec Path definit une fois-------------------*/

app.use('/auth/',                                                                require('./routes/authRoutes'));  // passport.authenticate('jwt', { session: false })    sur  GET Logout
app.use('/utilisateurs/',   passport.authenticate('jwt', { session: false }),    require('./routes/utilisateursRoutes'));
app.use('/equipes/',        passport.authenticate('jwt', { session: false }),    require('./routes/equipesRoutes'));
app.use('/matchs/',                                                              require('./routes/matchsRoutes'));
app.use('/pronos/',         passport.authenticate('jwt', { session: false }),    require('./routes/pronosRoutes'));
app.use('/buteurs/',        passport.authenticate('jwt', { session: false }),    require('./routes/buteursRoutes'));
app.use('/boosts/',         passport.authenticate('jwt', { session: false }),    require('./routes/boostsRoutes'));
app.use('/phases/',         passport.authenticate('jwt', { session: false }),    require('./routes/phasesRoutes'));
app.use('/achatBoosts/',    passport.authenticate('jwt', { session: false }),    require('./routes/achatBoostsRoutes'));


// app.use('/auth/',                                                               require('./routes/authRoutes'));
// app.use('/utilisateurs/',    require('./routes/utilisateursRoutes'));
// app.use('/equipes/',         require('./routes/equipesRoutes'));
// app.use('/matchs/',          require('./routes/matchsRoutes'));
// app.use('/pronos/',          require('./routes/pronosRoutes'));
// app.use('/buteurs/',         require('./routes/buteursRoutes'));
// app.use('/boosts/',          require('./routes/boostsRoutes'));
// app.use('/phases/',          require('./routes/phasesRoutes'));
// app.use('/achatBoosts/',     require('./routes/achatBoostsRoutes'));


// Pour charger toutes les 'vues.pug' dans le dossier 'views'
app.set('views',path.join(__dirname, 'public'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public'))); // Declaration du dossier public



// Start Server
var server = app.listen(3000, function(){
    console.log('Server started on port 3000');
});


