
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

  app.set('views', path.join(__dirname, 'views'));

const exphbs = require('express-handlebars');

  app.engine('handlebars', exphbs({
  	defaultLayout: 'main'
  }));
  app.set('view engine', 'handlebars');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

const configDB = require('./config/database');

if(process.env.MONGODB_URL) {
  mongoose.connect(process.env.MONGODB_URL);
}else {
  mongoose.connect(configDB.url);
};


mongoose.connect(configDB.url);

const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });


// catch 404 and forward to error handler
  app.use( function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  // no stacktraces leaked to user unless in development environment
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    })
  });

const debug = require('debug')('express-example');

  app.set('port', process.env.PORT || 3000);

  const server = app.listen(app.get('port'), function() {

  	debug('Express server listening on port ' + server.address().port);
  });

module.exports = app;

